import React from 'react';
import { experiences } from "../../resume";

export default function Experience() {
        return (
            <div className="experiences">
                { experiences.map((xp, index) => {
                    return (
                        <div key={index} className="experience">
                            <h4>{ xp.title }</h4>
                            <h5>{ xp.company + " - " + xp.location }</h5>
                            <p>{ xp.date }</p>
                            <p>{ xp.mission.description}</p>
                            <ul>
                                { xp.mission.missions.map((mission, i) => {
                                    return (
                                        <li key={i}>{ mission }</li>
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