import {subtraction} from "./common.js";

export {twoDigitSubtraction, threeDigitSubtraction};

twoDigitSubtraction.description = "0-99 - 0-99";
threeDigitSubtraction.description = "100-999 - 100-999";


function twoDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [0, 100], [0, 100], (x, y) => x > y);
}

function threeDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [100, 1000], [100, 1000], (x, y) => x > y);
}