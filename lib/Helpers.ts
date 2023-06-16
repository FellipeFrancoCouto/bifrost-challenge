import generate from '@babel/generator';
import { parse, ParseResult } from '@babel/parser';
import * as babel from '@babel/types';

export function createFileAstFromCodeString(code: string) {
	const fileAst = parse(code, {
		sourceType: 'module',
		plugins: ['typescript', 'jsx'],
	});

	if (fileAst === null) {
		throw new Error('Unable to parse code and create AST');
	}

	return fileAst;
}

export function findJsxElementFromFileAst(fileAst: ParseResult<babel.File>) {
	const functionDeclarationAst = fileAst.program.body.find(
		(node) => node.type === 'FunctionDeclaration'
	);

	if (functionDeclarationAst) {
		const returnStatement = (functionDeclarationAst as babel.FunctionDeclaration).body.body.find(
			(node) => node.type === 'ReturnStatement'
		);

		if (returnStatement) {
			const jsxElement = (returnStatement as babel.ReturnStatement).argument;
			return jsxElement as babel.JSXElement;
		}
	}

	return null;
}

export function createFunctionDeclarationAstFromJsxElement(
	jsxElement: babel.JSXElement,
	name: string
) {
	const returnStatement = babel.returnStatement(jsxElement);
	const identifier = babel.identifier(name);

	const functionDeclarationAst = babel.functionDeclaration(
		identifier,
		[],
		babel.blockStatement([returnStatement])
	);

	return functionDeclarationAst;
}

export function createJsxElementForComponent(name: string) {
	const identifier = babel.jsxIdentifier(name);
	const jsxElement = babel.jsxElement(
		babel.jsxOpeningElement(identifier, [], true),
		null,
		[],
		true
	);

	return jsxElement;
}

export function addFunctionDeclarationToFileAst(
	fileAst: ParseResult<babel.File>,
	functionDeclarationAst: babel.FunctionDeclaration
) {
	fileAst.program.body.push(functionDeclarationAst);
}

export function createCodeStringFromFileAst(fileAst: ParseResult<babel.File>) {
	const code = generate(fileAst).code;
	return code;
}