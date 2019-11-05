import React from 'react';
import { commands } from "../../constants";

export default function Help(){
    return (
        <div>
            This is a list of all available commands:
            <table>
                <tbody>
                    { commands.map((cmd, index) => {
                        return (
                            <tr key={index}>
                            <td style={{ fontWeight: "bold" }}>
                                { cmd.aliases.join(",") }
                            </td>
                            <td>
                                { cmd.description }
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}