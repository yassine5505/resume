import React from "react";
import { guest, separator, host, colon, home, dollar } from '../../constants';
import "./guest-host.css";

// User and host information displayed in the beginning of each line
// E.g: yassine5505@Notebook:/$ <command>
export default function (){
    return (
        <span>
            <span className="guest">{ guest }</span>
            <span className="separator">{ separator }</span>
            <span className="host">{ host }</span>
            <span className="colon">{ colon }</span>
            <span className="home">{ home }</span>
            <span className="dollar">{ dollar }</span>
        </span>
    )
}
