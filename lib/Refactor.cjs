"use strict";
exports.__esModule = true;
exports.refactorReactCode = void 0;
var traverse_1 = require("@babel/traverse");
var parser = require("@babel/parser");
var generator_1 = require("@babel/generator");
var _ = require("lodash");
var Helpers_cjs_1 = require("./Helpers.cjs");
var plugins = ['jsx'];
function findIndexComponents(path, Components
// visited: Set<any>
) {
    var node = path.node;
    var matchingComponentIndex = Components.findIndex(function (component) { return _.isEqual(node, component); });
    //Double checking the match, for some reason there are some false positives with lodash
    if (matchingComponentIndex != -1) {
        var str1 = String((0, generator_1["default"])(Components[matchingComponentIndex]).code);
        var str2 = String((0, generator_1["default"])(node).code);
        if (str1 !== str2) {
            matchingComponentIndex = -1;
        }
    }
    return matchingComponentIndex;
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function refactorReactCode(reactCode) {
    // Parse the React code
    var fileAst = (0, Helpers_cjs_1.createFileAstFromCodeString)(reactCode);
    // Stores reusable components
    var uniqueComponents = [];
    var reusedComponents = [];
    var visited = new Set();
    var queue = [fileAst];
    while (queue.length > 0) {
        var current = queue.shift();
        (0, traverse_1["default"])(current, {
            JSXElement: function (path) {
                // Process the JSX element here
                var _a = path.node, openingElement = _a.openingElement, closingElement = _a.closingElement;
                if (findIndexComponents(path, uniqueComponents) == -1) {
                    uniqueComponents.push(path.node);
                    // Enqueue the child elements
                    path.traverse({
                        JSXElement: function (childPath) {
                            var nodeCodeString = (0, generator_1["default"])(childPath.node);
                            var nodeFile = parser.parse(nodeCodeString.code, {
                                sourceType: 'module',
                                plugins: plugins
                            });
                            queue.push(nodeFile);
                        }
                    });
                }
                else {
                    if (findIndexComponents(path, reusedComponents) == -1) {
                        reusedComponents.push(path.node);
                    }
                }
            }
        });
    }
    var updatedCode = (0, Helpers_cjs_1.createCodeStringFromFileAst)(fileAst);
    console.log(uniqueComponents.length);
    console.log(reusedComponents.length);
    console.log("upcode");
    console.log(updatedCode);
    // Create function declarations for the reusable components
    reusedComponents.forEach(function (jsx, index) {
        var success = false;
        var reactcode = String((0, generator_1["default"])(jsx).code);
        var name = "Component".concat(index);
        var element = "<".concat(name, " />");
        // Check if updatedCode contains reactcode
        var matches = updatedCode.match(new RegExp(escapeRegExp(reactcode), 'g'));
        if (matches && matches.length >= 2) {
            // Replace all occurrences of reactcode in updatedCode with element
            updatedCode = updatedCode.replace(new RegExp(escapeRegExp(reactcode), 'g'), element);
            success = true;
        }
        if (success) {
            var functionDeclarationAst = (0, Helpers_cjs_1.createFunctionDeclarationAstFromJsxElement)(jsx, name);
            var code = String((0, generator_1["default"])(functionDeclarationAst).code);
            console.log(code);
            console.log('before');
            console.log(updatedCode);
            updatedCode += '\n' + code;
            console.log('after');
            console.log(updatedCode);
        }
    });
    // Generate the updated React code
    return updatedCode;
}
exports.refactorReactCode = refactorReactCode;
