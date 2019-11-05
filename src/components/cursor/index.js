import React from 'react';
import './cursor.css';

// Using Cursor as a class component to be able to use 
// lifecycle methods for ref scrolling
export default class Cursor extends React.Component {
    render() {
        return (
            <span className="cursor">
                |
            </span>
        );  
    }
}
