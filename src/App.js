import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Menu from './menu/Menu'
import { getTokens } from './utils/local-storage';




function App() {

  const [CurrentFeature, setCurrentFeature] = useState(null);
  const [tokens, setTokens] = useState(getTokens());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Menu setCurrentFeature={setCurrentFeature} />

      {CurrentFeature
        ? <CurrentFeature tokens={tokens} setTokens={setTokens}/>
        : ''
      }

    </div>
  );
}

export default App;
