import './ProblemPanel.css'
import {useState} from "react";

export default function ProblemPanel() {
    let [userAnswer, setUserAnswer] = useState("");
    let [problem, setProblem] = useState(generateProblem());
    
    return (
        <div className='current-problem-container'>
            <div className="current-problem-content">
                <span>{problem.question}</span>
                <span>=</span>
            </div>
            <input
                type="text"
                className="current-problem-solution"
                value={userAnswer}
                onChange={e => {
                    setUserAnswer(e.target.value);
                    if (e.target.value === problem.answer) {
                        alert("correct");
                        setUserAnswer("");
                        setProblem(generateProblem());
                    }
                }}/>
        </div>
    );
}

function generateProblem() {
    let problems = [
        {question: "23+89", answer: "112"},
        {question: "67+77", answer: "144"},
        {question: "12+67", answer: "79"}
    ]
    return problems[Math.floor(Math.random() * problems.length)];
}