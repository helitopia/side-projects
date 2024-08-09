/**
 * Two-digit x 11
 */
function xEleven(n) {
    let m = [];
    for (let i = 11; i <= 99; i += 3)
        addProblemToArray(m, `${i} x 11`, i * 11);
    return randomPart(m, n);
}

/**
 * Two-digit ending in 5 ^ 2
 */
function squareFive(n) {
    let m = [];
    for (let i = 15; i < 100; i += 10)
        addProblemToArray(m, `${i} ^ 2`, i * i)
    return randomPart(m, n);
}

/**
 * First digit the same, second digit adding up to 10
 */
function addingUpToTen(n) {
    let m = [];
    for (let i = 11; i < 100; i += 1) {
        if (i % 10 === 0)
            continue
        let tens = ("" + i)[0],
            ones = ("" + i)[1],
            complement = Number(`${tens}${10 - ones}`)
        addProblemToArray(m, `${i} x ${complement}`, i * complement);
    }
    return randomPart(m, n);
}

/**
 * 1st January of 21st century which day
 */
function firstJanuary(n) {
    let m = [];
    let weekday = new Array(7);
    weekday[0] = "Mon";
    weekday[1] = "Tue";
    weekday[2] = "Wed";
    weekday[3] = "Thu";
    weekday[4] = "Fri";
    weekday[5] = "Sat";
    weekday[6] = "Sun";
    for (let i = 2000; i < 2100; i += 1) {
        let t = Math.floor(Number(("" + i).substring(2)) * 1.25) % 7;
        addProblemToArray(m, `1st January ${i}`, weekday[(t - 1 + 7) % 7])
    }
    return randomPart(m, n);
}

/**
 * 2-digit addition
 */
function twoDigitAddition(n) {
    return randomPart(addition([0, 100]), n);
}

function threeDigitAddition(n) {
    return randomPart(addition([0, 1000]), n);
}

function addition(operandOneRange, operandTwoRange, operandOneFilter, operandTwoFilter) {
    operandTwoRange ||= [...operandOneRange];
    operandOneFilter ||= x => x;
    operandTwoFilter ||= x => x;

    let problems = [];
    for (let [start1, end1] = operandOneRange; start1 < end1; start1++)
        for (let [start2, end2] = operandTwoRange; start2 < end2; start2++) {
            let addendOne = operandOneFilter(start1);
            let addendTwo = operandTwoFilter(start2);
            addProblemToArray(problems, `${addendOne} + ${addendTwo}`, addendOne + addendTwo)
        }
    return problems;
}
