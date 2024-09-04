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
        .flatMap(i => i.functionHandler(Math.floor(config.problemAmountElem.value / checkedInputIds.length))));

    updateProblem();
}

function updateProblem() {
    if (++config.currentProblemIdx === config.problems.length) {
        config.answerInputElem.disabled = true;
        return;
    }

    let currProblem = config.problems[config.currentProblemIdx % config.problems.length];
    let problemDisplay = currProblem.display();
    config.answerInputElem.value = "";
    // config.problemContentElem.textContent = problemDisplay;
    speak(problemDisplay.replace("=", "").replace("-", "minus"));
    config.answerElem.textContent = currProblem.solution
}

function enableInputValidation() {
    config.answerInputElem.addEventListener("input", d => {
        if (config.answerInputElem.value == config.problems[config.currentProblemIdx].solution) {
            setTimeout(() => {
                config.answerInputElem.value = "";
                updateProblem()
            }, 100);
        }
    })
}

function speak(text) {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[2]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
}