import {addition} from "./common.js";

export {twoDigitAddition, threeDigitAddition};

twoDigitAddition.description = "0-99 + 0-99";
threeDigitAddition.description = "0-999 + 0-999";


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