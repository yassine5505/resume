import React from 'react';
import './App.css';
import Cursor from './components/cursor';
import { guest, dollarSeparator, host, suffix, messages, commands } from './constants';

export const guestHost = (
  <span>
    <span className="guest">{ guest }</span>
    <span className="separator">{ dollarSeparator }</span>
    <span className="host">{ host }</span>
    <span className="suffix">{ suffix}</span>
  </span>
);
function App() {
  return (
    <div className="console">
      <Cursor />
    </div>
  );
}

export default App;
