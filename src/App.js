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

export default class App extends React.Component {
  defaultState = {
    input: "",
    executedCommands: [],
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

  handleScrollToCursor = () => {
    let cursorCoords = ReactDOM
      .findDOMNode(this.refs['cursor'])
      .getBoundingClientRect();
    let cursor = ReactDOM
    .findDOMNode(this.refs['cursor']);
    cursor.scrollIntoView();
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
