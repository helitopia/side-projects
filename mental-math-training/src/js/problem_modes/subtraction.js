import {binaryOperation} from "./common.js";

export {subtraction, twoDigitSubtraction};

function subtraction(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "-",
        (x, y) => x - y
    );
}

function twoDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [0, 100], [0, 100], (x, y) => x > y);
}