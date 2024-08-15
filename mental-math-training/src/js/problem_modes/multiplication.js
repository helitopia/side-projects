import {getDigit, randomPart} from "../util.js";
import {binaryOperation} from "./common.js";

export {xEleven, nhTimesNm};

function multiplication(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "x",
        (x, y) => x * y
    );
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
