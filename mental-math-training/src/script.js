const problemElem = document.querySelector("#problem");
const answerElem = document.querySelector(".answer");
let problems = defineProblems();
let currentProblemIdx = -1;

updateProblem();
enableInputValidation();

function defineProblems() {
    let m = [];
// multiplication by 11
    for (let i = 11; i <= 99; i += 3)
        m.push({problem: `${i} x 11`, solution: i * 11});

// squaring two-digit ending in 5
    for (let i = 15; i < 100; i += 10)
        m.push({problem: `${i} ^ 2`, solution: i * i})

// first digit the same, second digit adding up to 10
    for (let i = 11; i < 100; i += 3) {
        if (i % 10 === 0)
            continue
        let tens = ("" + i)[0],
            ones = ("" + i)[1],
            complement = Number(`${tens}${10 - ones}`)
        m.push({problem: `${i} x ${complement}`, solution: i * complement});
    }

// 1st January which day
    let weekday=new Array(7);
    weekday[0]="Mon";
    weekday[1]="Tue";
    weekday[2]="Wed";
    weekday[3]="Thu";
    weekday[4]="Fri";
    weekday[5]="Sat";
    weekday[6]="Sun";
    for (let i = 2000; i < 2040; i += 2){
        let t = Math.floor(Number(("" + i).substring(2)) * 1.25) % 7;
        m.push({problem: `1st January ${i}`, solution: weekday[(t - 1 + 7) % 7]})
    }
    return shuffle(m);
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

function updateProblem() {
    answerElem.value = "";
    problemElem.textContent = problems[++currentProblemIdx].problem + " =";
}

function enableInputValidation() {
    answerElem.addEventListener("input", d => {
        if (answerElem.value == problems[currentProblemIdx].solution) {
            answerElem.value = "";
            updateProblem()
        }
    })
}