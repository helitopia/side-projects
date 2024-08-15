import {getDigit, randomPart} from "../util.js";
import {MathBinaryProblem} from "../objects/problem_type.js";

export {xEleven, nhTimesNm};

/**
 * See addition.js => addition() for details
 */
function multiplication(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    operandTwoRange ||= [...operandOneRange];
    operandFilter ||= () => true;

    let problems = [];
    for (let [start1, end1] = operandOneRange; start1 < end1; start1++)
        for (let [start2, end2] = operandTwoRange; start2 < end2; start2++) {
            if (!operandFilter(start1, start2))
                continue
            let operandOne = start1;
            let operandTwo = start2;
            problems.push(new MathBinaryProblem(operandOne, operandTwo, "x", operandOne * operandTwo))
        }
    return randomPart(problems, problemAmount);
}

/**
 * NN x 11
 */
function xEleven(problemAmount) {
    return multiplication(problemAmount, [0, 100], [11, 12]);
}

/**
 * NH x NM, where H + M = 10
 */
function nhTimesNm(problemAmount) {
    return randomPart(multiplication(
        [0, 100],
        [0, 100],
        (x, y) => getDigit(x, 0) === getDigit(y, 0)
            && getDigit(x, 1) + getDigit(y, 1) === 10
    ), problemAmount);
}
