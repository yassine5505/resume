import React from "react";
import { commands } from "../../constants";
import Help from "./help";
import Experience from "./experience";

function renderComponent (command) {
    switch(command){
        case commands[0].name:
            return <Help />;
        case commands[1].name:
            return <Experience />;
        default: return null;
    }
}

export default function Script({props}) {
    const { command } = props;
    return (
        <div className="script">
            {
                renderComponent(command)
            }
        </div> 
    );
}