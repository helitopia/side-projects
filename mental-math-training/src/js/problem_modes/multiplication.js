import {getDigit} from "../util.js";
import {multiplication} from "./common.js";

export {xEleven, nhTimesNm};

xEleven.description = "0-99 x 11";
nhTimesNm.description = "NH x NM, where H + M = 10";


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
    return multiplication(
        problemAmount,
        [0, 100],
        [0, 100],
        (x, y) => getDigit(x, 0) === getDigit(y, 0)
            && getDigit(x, 1) + getDigit(y, 1) === 10
    );
}
