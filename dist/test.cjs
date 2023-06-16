"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var assert = require("assert");
var refactorReactCode = require('../lib/Refactor.cjs').refactorReactCode;
var dir = path.join(process.cwd(), 'components', 'CodingChallenge');
// Read all .tsx files in the directory
var files = fs.readdirSync(dir).filter(function (file) { return path.extname(file) === '.tsx'; });
// Test each file
files.forEach(function (file) {
    var basename = path.basename(file, '.tsx');
    // Ignore result files
    if (basename.endsWith('Result')) {
        return;
    }
    // Read the input and expected output files
    var input = fs.readFileSync(path.join(dir, file), { encoding: 'utf8' });
    var expectedOutput = fs.readFileSync(path.join(dir, "".concat(basename, "Result.tsx")), { encoding: 'utf8' }).trim();
    // Refactor the input code
    var output = refactorReactCode(input).trim();
    // Check if the output matches the expected output
    try {
        assert.strictEqual(output, expectedOutput);
        console.log("".concat(file, " passed."));
    }
    catch (err) {
        console.error("".concat(file, " failed. ").concat(err));
    }
});
