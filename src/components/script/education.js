import React from 'react';
import { education } from "../../resume";

export default function Education() {
        return (
            <div className="educations">
                { education.map((edu, index) => {
                    return (
                        <div key={index} className="education">
                            <h4>{ edu.title }</h4>
                            <h5>{ edu.institution }</h5>
                            <p>{ edu.date }</p>
                            <p>
                                <a href={edu.link} target="_blank" rel="noopener noreferrer">Curriculum</a>
                            </p>
                        </div>
                    );
                })
                }
            </div>
        )
}