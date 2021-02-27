import { useState, useRef, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn, isLoggedIn } from './LogIn.js';
import './Board.css';
import React from 'react';

function App() {

    return (
      <div>
        <LogIn />
        <div class="game">
          <Board />
        </div>
      </div>
    )
  
}

export default App;