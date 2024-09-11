import "./ConfigPanel.css";

export default function ConfigPanel() {
    return (
        <div className="config">
            <div className="problem-count">
                <span>Problem count: </span>
                <input type="number"/>
            </div>
            <div className="standard-modes">
                <div className="standard-modes-header">Standard modes ^</div>
                <div className="standard-mode">Addition ^</div>
                <div className="standard-mode">Subtraction ^</div>
            </div>
            <div className="custom-presets">
                <div className="custom-presets-header">Custom presets ^</div>
            </div>
        </div>
    )
}