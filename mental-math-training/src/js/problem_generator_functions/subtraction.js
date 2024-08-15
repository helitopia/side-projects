import {MathBinaryProblem} from "../objects/problem_type.js";
import {randomPart} from "../util.js";

export {subtraction, twoDigitSubtraction};

/**
 * See addition.js => addition() for details
 */
function subtraction(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    operandTwoRange ||= [...operandOneRange];
    operandFilter ||= () => true;

    let problems = [];
    for (let [start1, end1] = operandOneRange; start1 < end1; start1++)
        for (let [start2, end2] = operandTwoRange; start2 < end2; start2++) {
            if (!operandFilter(start1, start2))
                continue
            let addendOne = start1;
            let addendTwo = start2;
            problems.push(new MathBinaryProblem(addendOne, addendTwo, "-", addendOne - addendTwo))
        }
    return randomPart(problems, problemAmount);
}

function twoDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [0, 100], [0, 100], (x, y) => x > y);
}