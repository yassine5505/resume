import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Cursor from './components/cursor';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { keys, outputLineTypes, messages } from './constants';
import { inputIsValid,
    addGuestHost,
    addExecutable,
    addNoCommandFound,
    concatInput,
    addInput,
    deleteInput,
    initialOutput,
    isClear,
    getSuggestions, 
    addSuggestions,
    modifyInput} from './utils';
import { thisExpression } from '@babel/types';

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
    this.cursor = React.createRef();
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
      case keys.enter:   
        this.handleEnterKeyEvent();
        break;
      case keys.backspace:
          this.handleBackspaceEvent();
          break;
      case keys.tab:
          e.preventDefault();
          this.handleTabEvent();
          break;  
      case keys.space:
        this.handleSpaceEvent();
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
  handleEnterKeyEvent = () => {
    let { input, output, executedCommands, currentCommand } = this.state;
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
        if(isClear(input)) {
          output = addGuestHost([]);
          output = addInput(output);
          this.setState({
            output,
            input: "",
            executedCommands,
            currentCommand
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
    currentCommand = executedCommands.length - 1;
  }

  // Handle backspace control key
  handleBackspaceEvent = () => {
    const { input, output } = this.state;
    this.setState({
      output: deleteInput(output),
      input: input.substr(0, input.length - 1)
    });
  }

  handleTabEvent = () => {
    let { input, output } = this.state;
    let suggestions = getSuggestions(input);
    if(input === "" || suggestions.length === 0) return;
    else if(suggestions.length === 1) {
      // Component  re renders but not writing to input !!!
      input = suggestions[0];
      output = modifyInput(input, output);
      this.setState({
        input: suggestions[0],
        output
      });
    } else {
      output = addSuggestions(input, output);
      output = addGuestHost(output);
      output = addInput(output, input);
      this.setState({
        output
      });
    }
  }

  handleSpaceEvent = () => {
    let { input, output } = this.state;
    output = concatInput(" ", output);
        input = input.concat(" ");
        this.setState({
          input,
          output
        });
  }

  handleUpEvent = () => {
    // get previous executed command
    let { input, output, executedCommands, currentCommand } = this.state;
    if(executedCommands.length === 0) return;
    if(currentCommand <= 0) currentCommand = executedCommands.length - 1;
    else currentCommand -= 1;
    input = executedCommands[currentCommand];
    output = modifyInput(input, output);
    this.setState({
      input,
      output,
      currentCommand
    });
  }

  handleDownEvent = () => {
    let { input, output, executedCommands, currentCommand } = this.state;
    if(executedCommands.length === 0) return;
    if(currentCommand >= executedCommands.length - 1) currentCommand = 0;
    else currentCommand += 1;
    input = executedCommands[currentCommand];
    output = modifyInput(input, output);
    this.setState({
      input,
      output,
      currentCommand
    });
  }

  handleScrollToCursor = () => {
    ReactDOM
      .findDOMNode(this.refs['cursor']).scrollIntoView();
  }

  componentDidUpdate = () => {
    this.handleScrollToCursor();
  }

  componentDidMount = () => {
    this.handleScrollToCursor();
  }

  render() {
    const { output } = this.state;
    let inputIsEmpty = false;
    return (
      <div className="console" id="console">
        <KeyboardEventHandler handleKeys={['alphanumeric']} onKeyEvent={this.handleKeyEvent} />
        <KeyboardEventHandler handleKeys={['all']} onKeyEvent={this.handleControlKeyEvent} />
        { /* Render output here */ }
        { output.map((element, index) => {
          switch(element.type) {
            case outputLineTypes.executable:
              return (<element.component props={element.props} key={index} />);
            case outputLineTypes.input:
                if(element.props.text === "" || element.props.text === messages.welcome) inputIsEmpty = true;
                return (<element.component props={element.props} key={index} />);
            case outputLineTypes.suggestions:
                return <element.component suggestions={element.suggestions} key={index} />
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
              return <element.component props={element.props} key={index} />
            default: return null; 
          }
        })}
        <Cursor ref="cursor" />
      </div>
    );
  }
}
