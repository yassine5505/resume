import React from "react";
import { commands } from "../../constants";
import Help from "./help";
import Experience from "./experience";
import Education from "./education";
import Project from "./project";

function renderComponent (command) {
    switch(command){
        case commands[0].name:
            return <Help />;
        case commands[1].name:
            return <Experience />;
        case commands[3].name:
            return <Education />;
        case commands[4].name:
            return <Project />;
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