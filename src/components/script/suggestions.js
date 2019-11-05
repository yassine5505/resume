import React from "react";

// import { getSuggestions } from "../../utils";

export default function Suggestions(props) {
    let suggestions = Array.from(props.suggestions);
    return (
        <div>
            {
                suggestions.map((s,i) => {
                        return (
                            <span key={i}>
                                { s }
                                &nbsp;
                            </span>
                        );
                    })
            }
        </div>
    );
}