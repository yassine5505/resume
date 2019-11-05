import React from 'react';
import { projects } from "../../resume";

export default function Education() {
        return (
            <div className="projects">
                { projects.map((project, index) => {
                    return (
                        <div key={index} className="project">
                            <h4>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    { project.title }
                                </a>
                            </h4>
                            <h5>{ project.subtitle }</h5>
                            <p>{ project.description }</p>
                            <ul>
                                { project.missions.map((mission, i) => {
                                    return (
                                        <li>{ mission }</li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })
                }
            </div>
        )
}