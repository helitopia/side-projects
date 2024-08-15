import {binaryOperation} from "./common.js";

export {addition, twoDigitAddition, threeDigitAddition};

function addition(problemAmount, operandOneRange, operandTwoRange, operandFilter) {
    return binaryOperation(
        problemAmount,
        operandOneRange,
        operandTwoRange,
        operandFilter,
        "+",
        (x, y) => x + y
    );
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