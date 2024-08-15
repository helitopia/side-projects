import config from './config.js';
import * as predefinedAddition from "./problem_modes/addition.js";
import * as predefinedSubtraction from "./problem_modes/subtraction.js";
import * as predefinedMultiplication from "./problem_modes/multiplication.js";
import * as predefinedDates from "./problem_modes/dates.js";
import {shuffle} from "./util.js";
import {ProblemMode} from "./objects/problem_mode.js";


const predefinedModes = [
    ...Object.values(predefinedAddition),
    ...Object.values(predefinedSubtraction),
    ...Object.values(predefinedMultiplication),
    ...Object.values(predefinedDates)
];

let totalProblemModes = predefinedModes.map(m => new ProblemMode(m.description, m));

renderModes();
enableInputValidation();

function renderModes() {
    for (let {name: optionName, functionHandler: optionHandler} of totalProblemModes) {
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

    config.problems = shuffle(totalProblemModes
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