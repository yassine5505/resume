import React from 'react';

export default function({props}) {
    const { text } = props;
    return (
        <span>
            {text}
        </span>
    );
}