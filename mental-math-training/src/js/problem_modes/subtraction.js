import {binaryOperation, subtraction} from "./common.js";
import {getDigit} from "../util.js";

export {twoDigitSubtraction, threeDigitSubtraction, threeDigitComplexSubtraction, subtractionUtilAddition};

twoDigitSubtraction.description = "0-99 - 0-99";
threeDigitSubtraction.description = "100-999 - 100-999";
threeDigitComplexSubtraction.description = "Tens or ones minuend < subtrahend; 100-999 - 100-999";
subtractionUtilAddition.description = "Subtraction util -> [0, 11] - [0, 11]; x < y"


function twoDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [0, 100], [0, 100], (x, y) => x > y);
}

function threeDigitSubtraction(problemAmount) {
    return subtraction(problemAmount, [100, 1000], [100, 1000], (x, y) => x > y);
}

function threeDigitComplexSubtraction(problemAmount) {
    let filter = (x, y) => {
        let firstTens = getDigit(x, 1);
        let firstOnes = getDigit(x, 2);
        let secondTens = getDigit(y, 1);
        let secondOnes = getDigit(y, 2);
        return x > y && (firstTens < secondTens || firstOnes < secondOnes);
    }
    return subtraction(problemAmount, [100, 1000], [100, 1000], filter);

}

function subtractionUtilAddition(problemAmount) {
    return binaryOperation(problemAmount,
        [0, 11],
        [0, 10],
        (x, y) => x < y,
        "-",
        (x, y) => 10 + x - y
    );
}