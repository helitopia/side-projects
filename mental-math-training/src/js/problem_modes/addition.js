import {addition} from "./common.js";
import {MathUnaryProblem} from "../objects/problem_type.js";
import {randomPart} from "../util.js";

export {twoDigitAddition, threeDigitAddition, oneHundredComplements};

twoDigitAddition.description = "0-99 + 0-99";
threeDigitAddition.description = "0-999 + 0-999";
oneHundredComplements.description = "NN + x = 100, x = ?";


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

/**
 * NN + x = 100, x = ?
 * @param problemAmount
 * @returns {*}
 */
function oneHundredComplements(problemAmount) {
    let problems = [];
    for (let i = 10; i < 100; i++) {
        problems.push(new MathUnaryProblem(`${i} + x = 100; x = `, 100 - i))
        problems.push(new MathUnaryProblem(`${100 - i} + x = 100; x = `, i))
    }
    return randomPart(problems, problemAmount);
}