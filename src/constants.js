export const guest = "guest";

export const separator = "@";

export const host = "Notebook";

export const colon = ":";

export const home = "~";

export const dollar = "$";

export const outputLineTypes = {
    "guestHost": "guestHost",
    "input": "input",
    "executable": "executable",
    "noCommandFound": "noCommandFound"
}

export const messages = {
    "help": "For help, type help or -h",
    "experience": "For a full list of my experiences, type xp or experience",
    "noCommandFound": "no command was found",
    "welcome": "Welcome to my portfolio, get started by typing help to get a full list of available commands"
};

export const commands = [
    {
        "name": "help",
        "aliases": ["help", "h"],
    },
    {
        "name": "experience",
        "aliases": ["exp", "xp", "experience"],
    },
    {
        "name": "clear",
        "aliases": ["clear", "c"],
    },
];

// All executables with html
export const executables = [
    "help", "experience"
];

// Keyboard keys
export const keys = {
    "enter": "enter",
    "esc": "esc",
    "backspace": "backspace"
}