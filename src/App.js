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
  
  function calculateWinner({squares}) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
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