import traverse from '@babel/traverse';
import * as t from '@babel/types';
import * as parser from '@babel/parser';
import generate from "@babel/generator";
import * as _ from 'lodash';
import { File } from '@babel/types';

import {
	addFunctionDeclarationToFileAst,
	createCodeStringFromFileAst,
	createFileAstFromCodeString,
	createFunctionDeclarationAstFromJsxElement,
	createJsxElementForComponent,
	findJsxElementFromFileAst,
} from './Helpers.cjs';
import { NodePath } from 'babel-traverse';

const plugins: parser.ParserPlugin[] = ['jsx'];

function findIndexComponents(
	path: babel.NodePath<t.JSXElement>,
	Components: t.JSXElement[]
) {
	const node = path.node;

	let matchingComponentIndex = Components.findIndex((component) => _.isEqual(node, component));
	
	//Double checking the match, for some reason there are some false positives with lodash
	if (matchingComponentIndex!=-1){
		const str1=String(generate(Components[matchingComponentIndex]).code)
		const str2=String(generate(node).code)
		if(str1!==str2){
			matchingComponentIndex=-1
		}
	}

	return matchingComponentIndex;
}

function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function refactorReactCode(reactCode: string): string {
	// Parse the React code
	const fileAst = createFileAstFromCodeString(reactCode);

	// Stores reusable components
	const uniqueComponents: t.JSXElement[] = [];
	const reusedComponents: t.JSXElement[] = [];
	const visited = new Set();

  	const queue = [fileAst];

	while (queue.length > 0) {
		const current = queue.shift();

		traverse(current!, {
		JSXElement(path) {
			// Process the JSX element here
			const { openingElement, closingElement } = path.node;

			if(findIndexComponents(path, uniqueComponents) == -1) {
				uniqueComponents.push(path.node)
				// Enqueue the child elements
				path.traverse({
					JSXElement(childPath) {
									const nodeCodeString = generate(childPath.node)
									const nodeFile = parser.parse(nodeCodeString.code, {
										sourceType: 'module',
										plugins,
									})
						queue.push(nodeFile);
					},
					});
			}
			else{
				if (findIndexComponents(path, reusedComponents) == -1){
					reusedComponents.push(path.node)
				}
			}				
		},
		});
	}

	
	let updatedCode = createCodeStringFromFileAst(fileAst);
	console.log(uniqueComponents.length);
	console.log(reusedComponents.length);
	console.log(`upcode`);
	console.log(updatedCode);

	// Create function declarations for the reusable components
	reusedComponents.forEach((jsx: any, index: number) => {
		let success = false
		const reactcode = String(generate(jsx).code);
		const name = `Component${index}`;
		const element = `<${name} />`;
	  
		// Check if updatedCode contains reactcode
		let matches = updatedCode.match(new RegExp(escapeRegExp(reactcode), 'g'));
		if (matches && matches.length >= 2) {
			// Replace all occurrences of reactcode in updatedCode with element
			updatedCode = updatedCode.replace(new RegExp(escapeRegExp(reactcode), 'g'), element);
			success = true;
		}

		if (success){
			const functionDeclarationAst = createFunctionDeclarationAstFromJsxElement(jsx, name);
			const code = String(generate(functionDeclarationAst).code);
			updatedCode+='\n'+code;
		}
	});
	
	// Generate the updated React code
	return updatedCode;
}
