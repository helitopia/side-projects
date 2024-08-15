import {subtraction} from "./common.js";

export {twoDigitSubtraction};

twoDigitSubtraction.description = "0-99 - 0-99";


function twoDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [0, 100], [0, 100], (x, y) => x > y);
}