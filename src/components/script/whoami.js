import React from 'react';
import { bio } from "../../resume";

export default function Whoami() {
        return (
            <div className="whoami">
                <h4>{ bio.name }</h4>
                <h5>{ bio.title }</h5>
                <p>{ bio.description }</p>
                <p>{ "Phone: " + bio.phone }</p>
                <p>
                    Email:
                    &nbsp;
                    <a href={"mailto:" + bio.email}>{ bio.email }</a>
                </p>
                {
                    bio.contact.map((contact, index) => {
                        return (
                            <div key={index}>
                                <a href={contact.link} target="_blank" rel="noopener noreferrer">
                                    {contact.name}
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        )
}