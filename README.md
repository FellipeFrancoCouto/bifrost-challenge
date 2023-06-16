## Coding Challenge's Objective

```
Make a system to automatically recognize and split out re-useable sub-components from a react file
```
## Main added files
```
.lib\Refactor.ts - contains the main funtion to accomplish the goal
.lib\Refactor.cjs - contains the functions in CommonJS format
.dist\tests.ts - adds a testing script
.dist\tests.ts - has the tests in the CommonJS format
```

## How to run
1. Install dependencies. I followed the recommendation from the propmt and only added one package, which is the lodash package. Make sure ```lodash``` is properly installed.
```
npm i
```
2. Use npx to run the tsc compiler
```
npx tsc
```
3. Execute the test script. To add more files to be tested, follow the same structure presented in the components folder.
```
node dist/test.cjs
```
## Notes on the process & results

This was a challenging, but fun project. You will note in the time breakdown below that I was very strict with time and tried to obey the 4 hour time constraint to the maximum extent possible (i.e., using an app to track minutes and seconds elapsed during each part of the challenge).
Here is how the timing of the project worked:

1. Familiarizing with the prompt and getting started (e.g., installing dependencies): 15'48"
2. Sketching solution (pseudocode): 14'25"
3. Writing ```Refactor.ts```: 67'54" 
4. Writing ```test.ts```: 49'14"
5. Debugging ```Refactor.ts``` & ```test.ts``` and creating ```.cjs``` files: 84'55"
6. Do some "code hygiene" & documentation (e.g., ```README.md``` & code comments): 15'35"

Approximate total time: 4:05 h 

Overall, the logic to solve the problem posed by the prompt can be described as follows. This can be further enhanced to take into account more nuanced business cases. This is aa high level description of the logic and omitts some inner functionalities for the sake of simplicity:

1. **Analyze and Parse JSX Code**: Use Babel to parse the JSX/React codebas and convert it to an Abstract Syntax Tree (AST).

2. **Identify Similar JSX Elements**: Traverse the AST to identify JSX elements that have the same structure. Here we could look for similar structures rather than exact matches in order to account for the variety of cases that the business would handle.

3. **Component Extraction**: Extract similar JSX elements and create a new reusable React component. The new component should accept props for parts of the JSX that differ between instances.

4. **Code Transformation**: Replace all instances of the similar JSX elements in the original code with the newly created reusable component. Make sure to pass the appropriate props to each instance of the component, based on the specific values in the original JSX.

5. **Optimize for Performance**: Considering the solution being deployed to different scenarions, it is crucial to ensure that the new structure does not degrade performance. Sometimes, making a component reusable might add unnecessary re-rendering, so make sure to use React's optimization techniques, such as memoization. This is something not taken into account for this challenge, but could be very useful in the real world.

6. **Test the Refactored Code**: Test and make sure the code behaves the same way as the original.

7. **Documentation**: It is crucial to maintain extensive documentation to allow developers to have easier times fixing problems.

The developed solution implements all the functionalities required by the prompt and most of those described above. Being completely honest, debugging the code was very challenging since I was getting a lot of false positives, which was partially fixed by a support function I developed. Given the challenge posed by debugging, I did not have enough time to make the code perfectly optimal solving all the potential cases. The code, however, answers the prompt and works as expected for most of the cases. I hope the codebase proves that I can be a relevant member of the amazing Bifrost team. I am looking forward to hearing your feedback and hopefully joining you soon!