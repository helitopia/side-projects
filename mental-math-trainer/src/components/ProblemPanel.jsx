import './ProblemPanel.css'

function ProblemPanel() {
    return (
        <div className='current-problem-container'>
            <div>1 + 1 =</div>
            <input type="text" className="current-problem-solution"/>
        </div>
    )
}

export default ProblemPanel