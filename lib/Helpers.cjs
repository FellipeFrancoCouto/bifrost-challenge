"use strict";
exports.__esModule = true;
exports.createCodeStringFromFileAst = exports.addFunctionDeclarationToFileAst = exports.createJsxElementForComponent = exports.createFunctionDeclarationAstFromJsxElement = exports.findJsxElementFromFileAst = exports.createFileAstFromCodeString = void 0;
var generator_1 = require("@babel/generator");
var parser_1 = require("@babel/parser");
var babel = require("@babel/types");
function createFileAstFromCodeString(code) {
    var fileAst = (0, parser_1.parse)(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx']
    });
    if (fileAst === null) {
        throw new Error('Unable to parse code and create AST');
    }
    return fileAst;
}
exports.createFileAstFromCodeString = createFileAstFromCodeString;
function findJsxElementFromFileAst(fileAst) {
    var functionDeclarationAst = fileAst.program.body.find(function (node) { return node.type === 'FunctionDeclaration'; });
    if (functionDeclarationAst) {
        var returnStatement = functionDeclarationAst.body.body.find(function (node) { return node.type === 'ReturnStatement'; });
        if (returnStatement) {
            var jsxElement = returnStatement.argument;
            return jsxElement;
        }
    }
    return null;
}
exports.findJsxElementFromFileAst = findJsxElementFromFileAst;
function createFunctionDeclarationAstFromJsxElement(jsxElement, name) {
    var returnStatement = babel.returnStatement(jsxElement);
    var identifier = babel.identifier(name);
    var functionDeclarationAst = babel.functionDeclaration(identifier, [], babel.blockStatement([returnStatement]));
    return functionDeclarationAst;
}
exports.createFunctionDeclarationAstFromJsxElement = createFunctionDeclarationAstFromJsxElement;
function createJsxElementForComponent(name) {
    var identifier = babel.jsxIdentifier(name);
    var jsxElement = babel.jsxElement(babel.jsxOpeningElement(identifier, [], true), null, [], true);
    return jsxElement;
}
exports.createJsxElementForComponent = createJsxElementForComponent;
function addFunctionDeclarationToFileAst(fileAst, functionDeclarationAst) {
    fileAst.program.body.push(functionDeclarationAst);
}
exports.addFunctionDeclarationToFileAst = addFunctionDeclarationToFileAst;
function createCodeStringFromFileAst(fileAst) {
    var code = (0, generator_1["default"])(fileAst).code;
    return code;
}
exports.createCodeStringFromFileAst = createCodeStringFromFileAst;
