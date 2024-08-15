import {randomPart} from "../util.js";
import {MathBinaryProblem} from "../objects/problem_type.js"

export {addition, twoDigitAddition, threeDigitAddition};

/**
 * General function to generate various addition problems
 * @param operandOneRange two-element array [range_start, range_end]
 * @param operandTwoRange same as operandOneRange
 * @param operandFilter predicate that receives both operands on input and returns boolean
 * indicating whether to include such case into problem set
 * @param problemAmount amount of problems to generate in randomized order
 */
function addition(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    operandTwoRange ||= [...operandOneRange];
    operandFilter ||= () => true;

    let problems = [];
    for (let [start1, end1] = operandOneRange; start1 < end1; start1++)
        for (let [start2, end2] = operandTwoRange; start2 < end2; start2++) {
            if (!operandFilter(start1, start2))
                continue
            let addendOne = start1;
            let addendTwo = start2;
            problems.push(new MathBinaryProblem(addendOne, addendTwo, "+", addendOne + addendTwo))
        }
    return randomPart(problems, problemAmount);
}

/**
 * Shortcut for problems of type NN + NN
 */
function twoDigitAddition(problemAmount) {
    return addition(problemAmount, [0, 100]);
}

/**
 * Shortcut for problems of type NNN + NNN
 */
function threeDigitAddition(problemAmount) {
    return addition(problemAmount, [0, 1000]);
}