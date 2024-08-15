import {randomPart} from "../util.js";
import {DateProblem} from "../objects/problem_type.js";

export {firstJanuary};

/**
 * Problems of type "Which day is 1st January of 2000-2099 year"
 */
function firstJanuary(n) {
    let m = [];
    let weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (let i = 2000; i < 2100; i += 1) {
        let t = Math.floor(Number(("" + i).substring(2)) * 1.25) % 7;
        m.push(new DateProblem(`1st January ${i}`, weekday[(t - 1 + 7) % 7]));
    }
    return randomPart(m, n);
}
