import React from "react";

export default function NoCommandFound({props}) {
    const { text } = props;
    return (
        <div>
            { text }
        </div>
    );
}