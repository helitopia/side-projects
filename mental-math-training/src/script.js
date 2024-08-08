const problemElem = document.querySelector("#problem");
const answerPromptElem = document.querySelector(".answer-prompt");
const answerElem = document.querySelector(".answer");
let problems = defineProblems();
let currentProblemIdx = -1;

updateProblem();
enableInputValidation();

function defineProblems() {
    let m = twoDigitAddition();
    return shuffle(m);
}


function updateProblem() {
    answerPromptElem.value = "";
    let currProblem = problems[++currentProblemIdx];
    problemElem.textContent = currProblem.problem + " =";
    answerElem.textContent = currProblem.solution
}

function enableInputValidation() {
    answerPromptElem.addEventListener("input", d => {
        if (answerPromptElem.value == problems[currentProblemIdx].solution) {
            answerPromptElem.value = "";
            updateProblem()
        }
    })
}