const config = {
    problemElem: document.querySelector("#problem"),
    answerPromptElem: document.querySelector(".answer-prompt"),
    answerElem: document.querySelector(".answer"),
    optionsFieldset: document.querySelector(".options"),

    problemOptions: {
        "Two-digit addition": twoDigitAddition,
        "Three-digit addition": threeDigitAddition,
        "x 11": xEleven
    },

    currentProblemIdx: -1,
    problems: []
}

renderModes()
defineProblems();
enableInputValidation();


function renderModes() {
    for (let [optionName, optionHandler] of Object.entries(config.problemOptions)) {
        let div = document.createElement("div");
        let input = div.appendChild(document.createElement("input"));
        let label = div.appendChild(document.createElement("label"));

        input.type = "checkbox";
        input.id = optionHandler.name;
        input.checked = true;
        input.addEventListener("change", defineProblems);
        label.htmlFor = input.id;
        label.textContent = optionName;

        config.optionsFieldset.appendChild(div);
    }
}


function defineProblems() {
    let inputs = config.optionsFieldset.querySelectorAll("input");
    let checkedInputs = [...inputs].filter(i => i.checked);
    config.problems = shuffle(checkedInputs.flatMap(i => window[i.id]()));
    updateProblem();
}


function updateProblem() {
    config.answerPromptElem.value = "";
    let currProblem = config.problems[++config.currentProblemIdx];
    config.problemElem.textContent = currProblem.problem + " =";
    config.answerElem.textContent = currProblem.solution
}

function enableInputValidation() {
    config.answerPromptElem.addEventListener("input", d => {
        if (config.answerPromptElem.value == config.problems[config.currentProblemIdx].solution) {
            config.answerPromptElem.value = "";
            updateProblem()
        }
    })
}