import React from 'react';
import './App.css';
import Cursor from './components/cursor';
import GuestHost from './components/guest-host';

function App() {
  return (
    <div className="console">
      <GuestHost />
      <Cursor />
    </div>
  );
}

export default App;
