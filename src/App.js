import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { keys, outputLineTypes, messages } from './constants';
import { inputIsValid,
    addGuestHost,
    addExecutable,
    addNoCommandFound,
    concatInput,
    addInput,
    initialOutput,
    isClear,
    getSuggestions, 
    addSuggestions } from './utils';

export default class App extends React.Component {
  defaultState = {
    input: "",
    executedCommands: [],
    currentCommand: 0,
    output: initialOutput
  }

  constructor(props){
    super(props);
    this.state = this.defaultState;
  }
  
  // Handle key press (Alphanumeric)
  handleKeyEvent = (key) => {
    var element = document.getElementsByClassName("console");
    element.scrollTop = element.scrollHeight;

    let { input, output } = this.state;
    input = input.concat(key);
    output = concatInput(key, output);
    this.setState({
      input: input,
      output
    });
  }

  // Handle control key events
  handleControlKeyEvent = (key, e) => {
    switch(key) {
      case keys.tab:
        e.preventDefault();
        this.handleTabEvent();
        break;  
      case keys.up:
        e.preventDefault();
        this.handleUpEvent();
        break;
      case keys.down:
        e.preventDefault();
        this.handleDownEvent();
        break;
      default: return;
    }
  }

  // Handle Enter control key
  handleEnterKeyEvent = (e) => {
    e.preventDefault();
    let { input, output, executedCommands, currentCommand } = this.state;
    let associatedCommand = inputIsValid(input);
    output = addInput(output, input);
    if(input === "" || input === " ") {
      addGuestHost(output);
    } else if(associatedCommand) {
      executedCommands.push(input);
        if(isClear(input)) {
          output = addGuestHost([]);
        } else {
          addExecutable(associatedCommand, output);
          addGuestHost(output);
        }
    } else {
      addNoCommandFound(output, input);
      addGuestHost(output);
    }
    this.setState({
      input: "",
      output,
      executedCommands,
      currentCommand
    });
  }

  handleTabEvent = () => {
    let { input, output } = this.state;
    let suggestions = getSuggestions(input);
    if(input === "" || suggestions.length === 0) return;
    else if(suggestions.length === 1) {
      input = suggestions[0];
    } else {
      addInput(output, input)
      addSuggestions(input, output);
      addGuestHost(output);
    }
    this.setState({
      input: suggestions[0],
      output
    });
  }

  handleUpEvent = () => {
    let { input, executedCommands, currentCommand } = this.state;
    if(executedCommands.length === 0) return;
    if(currentCommand <= 0) currentCommand = executedCommands.length - 1;
    else currentCommand -= 1;
    input = executedCommands[currentCommand];
    this.setState({
      input,
      currentCommand
    });
  }

  handleDownEvent = () => {
    let { input, executedCommands, currentCommand } = this.state;
    if(executedCommands.length === 0) return;
    if(currentCommand >= executedCommands.length - 1) currentCommand = 0;
    else currentCommand += 1;
    input = executedCommands[currentCommand];
    this.setState({
      input,
      currentCommand
    });
  }

  handleCursorFocus = () => {
    // Scroll to input and focus it 
    let input = ReactDOM
      .findDOMNode(this.refs['input']);
    input.scrollIntoView();
    window.addEventListener('click', () => {
      input.focus()
    });
  }

  handleWindowClick = () => {
    window.addEventListener('keydown', e => {
      this.handleControlKeyEvent(e.key, e);
    });
  }

  componentDidUpdate = () => {
    this.handleCursorFocus();
  }

  componentDidMount = () => {
    this.handleCursorFocus();
    this.handleWindowClick();
  }

  handleInputChange = e => {
    let input = e.target.value;
    this.setState({
      input
    })
  }

  render() {
    const { input, output } = this.state;
    let inputIsEmpty = false;
    return (
      <div className="console" id="console">
        { /* Render output here */ }
        { output.map((element, index) => {
          switch(element.type) {
            case outputLineTypes.executable:
              return <element.component props={element.props} key={index} />;
            case outputLineTypes.input:
                if(element.props.text === "" || element.props.text === messages.welcome) inputIsEmpty = true;
                return <element.component props={element.props} key={index} />;
            case outputLineTypes.suggestions:
                return <element.component suggestions={element.suggestions} key={index} />;
            case outputLineTypes.guestHost:
                return inputIsEmpty ? (
                  <span key={index}>
                    <br />
                    <element.component props={element.props} />
                  </span>
                  ) : (
                    <element.component key={index} />
                  );
            case outputLineTypes.noCommandFound:
              return <element.component props={element.props} key={index} />;
            default: return null; 
          }
        })}
        <form onSubmit={this.handleEnterKeyEvent}>
          <input type="text" value={input} placeholder={""} ref="input" autoFocus onChange={this.handleInputChange} />
        </form>
      </div>
    );
  }
}
