import HelpPanel from "./HelpPanel.jsx";
import ProblemPanel from "./ProblemPanel.jsx";
import ConfigPanel from "./ConfigPanel.jsx";
import React from "react";

export default function App() {
    const [configVisible, setConfigVisible] = React.useState(false);
    document.onkeydown = e => {
        e.key === "\\" && setConfigVisible(!configVisible);
    };
    return (
        <>
            <ProblemPanel/>
            <HelpPanel/>
            {configVisible && <ConfigPanel/>}
        </>
    );
}