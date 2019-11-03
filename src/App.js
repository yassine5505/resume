import React from 'react';
import './App.css';
import Cursor from './components/cursor';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keys, outputLineTypes } from './constants';
import { inputIsValid,
    addGuestHost,
    addExecutable,
    addNoCommandFound,
    concatInput,
    addInput,
    deleteInput,
    reinitializedOutput,
    initialOutput,
    isClear } from './utils';

export default class App extends React.Component {
  defaultState = {
    input: "",
    executedCommands: [],
    output: initialOutput
  }

  constructor(props){
    super(props);
    this.state = this.defaultState;
  }
  
  // Handle key press (ALphanumeric)
  handleKeyEvent = (key) => {
    let { input, output } = this.state;
    input = input.concat(key);
    output = concatInput(key, output);
    this.setState({
      input: input,
      output
    });
  }

  // Handle control key events
  handleControlKeyEvent = (key) => {
    switch(key) {
      case keys.enter:   
        this.handleEnterKeyEvent();
        break;
      case keys.backspace:
          this.handleEnterBackspaceEvent();
          break;
      default: return;
    }
  }

  // Handle Enter control key
  handleEnterKeyEvent = () => {
    let { input, output, executedCommands } = this.state;
    let associatedCommand = inputIsValid(input);
    if(input === "") {
      output = addGuestHost(output);
      output = addInput(output);
      this.setState({
        output,
        input: ""
      });
    } else if(associatedCommand) {
      executedCommands.push(input);
        if(isClear(input)){
          output = addGuestHost([]);
          output = addInput(output);
    
          this.setState({
            output,
            input: "",
            executedCommands
          })
        } else {
          output = addExecutable(associatedCommand, output);
          output = addGuestHost(output);
          output = addInput(output);
          this.setState({
            output: output,
            input: "",
            executedCommands
          });
        }
    } else {
      output = addNoCommandFound(output, input);
      output = addGuestHost(output);
      output = addInput(output);
      this.setState({
        output: output,
        input: ""
      });
    }
  }

  // Handle backspace control key
  handleEnterBackspaceEvent = () => {
    const { input, output } = this.state;
    this.setState({
      output: deleteInput(output),
      input: input.substr(0, input.length - 1)
    });
  }

  render() {
    const { output, input } = this.state;
    let shouldReturnToLine = false;
    console.log(output);
    return (
      <div className="console">
        <KeyboardEventHandler handleKeys={['alphanumeric']} onKeyEvent={this.handleKeyEvent} />
        <KeyboardEventHandler handleKeys={['all']} onKeyEvent={this.handleControlKeyEvent} />
        { /* Render output here */ }
        { output.map((element, index) => {
          if (( element.type === input && element.props.text === "" ) ||
              element.type === outputLineTypes.executable ||
              element.type === outputLineTypes.noCommandFound
          ) shouldReturnToLine = true;
          else {
            shouldReturnToLine = false;
          }
          if(shouldReturnToLine) {
            return (
            <span key={index} >
              <br />
              <element.component props={element.props} />
            </span>
          )} else {
            return <element.component props={element.props} key={index} />;
          }
        })}
        <Cursor />
      </div>
    );
  }
}
