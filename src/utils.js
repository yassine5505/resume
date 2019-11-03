import { outputLineTypes, executables, messages } from "./constants";
import { commands } from "./constants";
import GuestHost from "./components/guest-host";
import Input from "./components/input";
import Script from "./components/script";
import NoCommandFound from "./components/script/no-command-found";

export const guestHost = () => {
    return {
        type: outputLineTypes.guestHost,
        props: {
            text: ""
        },
        component: GuestHost
    }
}

export const input = (text) => {
    return {
        type: outputLineTypes.input,
        props: {
            text
        },
        component: Input
    }
}

export const executable = (command) => {
    return {
        type: outputLineTypes.executable,
        props: {
            command,
            text: ""
        },
        component: Script
    }
}

export const noCommandFound = (command) => {
    return {
        type: outputLineTypes.noCommandFound,
        props: {
            command,
            text: command + ": " + messages.noCommandFound
        },
        component: NoCommandFound
    };
}

// Function that adds new GuestHost object to the stack
export function addGuestHost(stack){
    stack.push(guestHost());
    return stack;
}

// Function that adds new input to the stack
export function addInput(stack){
    stack.push(input(""));
    return stack;
}

// Function to add executable to the stack
export function addExecutable(command, stack){ 
    stack.push(executable(command));
    return stack;
}

// Function to no command found input type to the stack
export function addNoCommandFound(stack, command){ 
    stack.push(noCommandFound(command));
    return stack;

}

// Function that concats input to the already typed in text
export function concatInput(input, stack){
    // Get the last input type element in the stack,
    // concat new input to it input
    stack.reverse();
    let found = false;
    for(let i = 0; i < stack.length; i++) {
        if(stack[i].type === outputLineTypes.input) {
            stack[i].props.text = stack[i].props.text.concat(input);
            found = true;
            break;
        }
    }
    stack.reverse();
    return stack;
}

// Function that deletes one char from the current input
export function deleteInput(stack){
    stack.reverse();
    for(let i = 0; i < stack.length; i++) {
        if(stack[i].type === outputLineTypes.input) {
            // remove last char 
            if(stack[i].props.text.length > 0) {
                stack[i].props.text = stack[i].props.text.substr(0, stack[i].props.text.length -1)
            }
            else {
                stack[i].props.text = ""
            }
            break;
        }
    }
    stack.reverse();
    return stack;
}

// Check if an input command is valid
export function inputIsValid(input) {
    let found = false;
    // From the commands array, see if any command alias matched with input
    commands.forEach((element) => {
        // aliases
        if(element.aliases.includes(input)) {
            found = true;
        }
    });
    return found;
}

// Check if the input command is "clear"
export function isClear(input) {
    return input === commands[2].name;
}

// Get executable text given an input command
// This function assumes that the command is valid
export function getExecutableText(command) {
    for(let i = 0; i < executables.length; i++) {
        if(executables[i].command === command){
            // Run the script
            return executables[i].executable;
        }
    }
}

/* 
    Constant variables used by App
*/
export const initialOutput = [
    guestHost(),
    input(messages.welcome),
    guestHost(),
    input("")
];

export const reinitializedOutput = [
    guestHost(),
    input("")
];