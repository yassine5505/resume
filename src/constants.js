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
    "noCommandFound": "noCommandFound",
    "suggestions": "suggestions"
}

export const messages = {
    "help": "For help, type help or -h",
    "experience": "For a full list of my experiences, type xp or experience",
    "noCommandFound": "no command was found",
    "welcome": "Hi there ! Get started by typing 'h' or 'help' to get a full list of available commands"
};

export const commands = [
    {
        "name": "clear",
        "aliases": ["c", "clear"],
        "description": "Clear the output"
    },
    {
        "name": "help",
        "aliases": ["h", "help"],
        "description": "List available commands"
    },
    {
        "name": "experience",
        "aliases": ["xp", "exp", "experience"],
        "description": "My professional experiences"
    },
    {
        "name": "education",
        "aliases": ["edu", "education"],
        "description": "Academic education"
    },
    {
        "name": "projects",
        "aliases": ["p", "projects"],
        "description": "Projects and open source contributions"
    },
    {
        "name": "whoami",
        "aliases": ["w", "who", "whoami"],
        "description": "Who I am"
    },
    {
        "name": "skills",
        "aliases": ["s", "skills"],
        "description": "Programming languages and technologies"
    }
];

// All executables with html
export const executables = [
    "help", "experience"
];

// Keyboard keys
export const keys = {
    "enter": "enter",
    "esc": "esc",
    "backspace": "backspace",
    "tab": "tab",
    "space": "space",
    "up": "up",
    "down": "down"
}