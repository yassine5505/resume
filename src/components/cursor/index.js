import React, { Component } from 'react';
import './cursor.css';

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        const { visible } = this.state;
        // Blinking cursor with 0.5 second interval
        setInterval(
            this.setState({
                visible: !visible
            })
            ,
            500
        )
    }
    render() {
        const { visible } = this.state;
        return (
            <span className="cursor">
                |
            </span>
        )
    }
}