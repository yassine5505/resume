import React from 'react';

export default function Help(){
    return (
        <div>
            This is a list of all available commands:
            <table>
                <tbody>
                    <tr>
                        <td style={{ fontWeight: "bold" }}>experience, xp, exp: </td>
                        <td>List all experiences</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold" }}>edu, education: </td>
                        <td>List academic education</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold" }}>clear: </td>
                        <td>Clear the output</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}