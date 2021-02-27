import { useState, useRef, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import './Board.css';
import React from 'react';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn) {return <Board/>;}
    return;
  }
  
  useEffect(() => {
    socket.on('logging', (data) => {
      console.log('User login received!');
      setLogIn(true);
    });
  }, []);

    return (
      <div>
          {renderLogIn()}
        <div class="game">
          {renderBoard()}
        </div>
      </div>
    )
  
}

export default App;