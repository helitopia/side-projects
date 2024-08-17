export {randomPart, shuffle, getDigit};

/**
 * Get n random elements of arr
 */
function randomPart(arr, n) {
    return shuffle(arr).slice(0, n ?? 1);
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Return problem object. The function is used to centralize
 * problem object creation
 */
function addProblemToArray(arr, problem, solution) {
    arr.push({"problem": problem, "solution": solution})
}

/**
 * Retrieve digit of a number at specified index
 */
function getDigit(number, digitNum) {
    return +("" + number)[digitNum];
}