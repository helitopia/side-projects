import config from './config.js';
import {firstJanuary} from "./problem_generator_functions/dates.js";
import {nhTimesNm, xEleven} from "./problem_generator_functions/multiplication.js";
import {threeDigitAddition, twoDigitAddition} from "./problem_generator_functions/addition.js";
import {shuffle} from "./util.js";
import {ProblemMode} from "./objects/problem_mode.js";

let problemModes = [
    new ProblemMode("NN + NN", twoDigitAddition),
    new ProblemMode("NNN + NNN", threeDigitAddition),
    new ProblemMode("NN x 11", xEleven),
    new ProblemMode("NH x NM, where H + M = 10", nhTimesNm),
    new ProblemMode("1st January of 2000-2099 year", firstJanuary)
]

renderModes();
enableInputValidation();

function renderModes() {
    for (let {name: optionName, functionHandler: optionHandler} of problemModes) {
        let div = document.createElement("div");
        let input = div.appendChild(document.createElement("input"));
        let label = div.appendChild(document.createElement("label"));

        input.type = "checkbox";
        input.id = optionHandler.name;
        // input.checked = true;
        input.addEventListener("change", defineProblems);
        label.htmlFor = input.id;
        label.textContent = optionName;

        config.problemOptionsElem.appendChild(div);
    }
}


function defineProblems() {
    let inputs = config.problemOptionsElem.querySelectorAll("input");
    let checkedInputIds = [...inputs].filter(i => i.checked).map(i => i.id);

    config.problems = shuffle(problemModes
        .filter(i => checkedInputIds.includes(i.functionHandler.name))
        .flatMap(i => i.functionHandler()));

    updateProblem();
}


function updateProblem() {
    config.answerInputElem.value = "";
    let currProblem = config.problems[++config.currentProblemIdx];
    config.problemContentElem.textContent = currProblem.display();
    config.answerElem.textContent = currProblem.solution
}

function enableInputValidation() {
    config.answerInputElem.addEventListener("input", d => {
        if (config.answerInputElem.value == config.problems[config.currentProblemIdx].solution) {
            config.answerInputElem.value = "";
            updateProblem()
        }
    })
}