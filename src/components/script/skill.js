import React from "react";

import { skills } from "../../resume";

export default function Skill() {
    return skills.map((skill, i) => {
        return (
            <div key={i}>
                <h4>{ skill.category }</h4>
                { skill.skills.map((skillElement, j) => {
                    return (
                        <span key={j} className="skill">{ skillElement }</span>
                    );
                })}
            </div>
        );
    })
}