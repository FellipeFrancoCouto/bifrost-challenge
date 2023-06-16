import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
const { refactorReactCode } = require('../lib/Refactor');

const dir = path.join(process.cwd(), 'components', 'CodingChallenge');

// Read all .tsx files in the directory
const files: string[] = fs.readdirSync(dir).filter(file => path.extname(file) === '.tsx');

// Test each file
files.forEach((file: string) => {
  const basename: string = path.basename(file, '.tsx');

  // Ignore result files
  if (basename.endsWith('Result')) {
    return;
  }

  // Read the input and expected output files
  const input: string = fs.readFileSync(path.join(dir, file), { encoding: 'utf8' });

  const expectedOutput: string = fs.readFileSync(path.join(dir, `${basename}Result.tsx`), { encoding: 'utf8' }).trim();

  // Refactor the input code
  const output: string = refactorReactCode(input).trim();

  // Check if the output matches the expected output
  try {
    assert.strictEqual(output, expectedOutput);
    console.log(`${file} passed.`);
  } catch (err) {
    console.error(`${file} failed. ${err}`);
  }
});