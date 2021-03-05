import React from 'react';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import socket from "./Board.js";
import './Board.css';

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [userList, setUsers] = useState([]);
  const [user, setUserName] = useState("");
  let isSpect = isSpectator();
  let canStartGame = (userList.length >= 2) ? true: false;
  let playerX, playerO, whichPlayer;

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return
  }
  
  function renderBoard(){
    if(isLoggedIn && canStartGame) {
      if(user === playerX){ whichPlayer = true; }
      if(user === playerO){ whichPlayer = false;  }
      return (
        <div>
          <Board isSpectator={isSpect} userName={user} whichPlayer={whichPlayer} playerX={playerX} playerO={playerO}/>;
        </div>
      )
    }
    return
  }
  
  function renderUserList(){
    if(isLoggedIn){
      let length = userList.length;
      playerX = userList[0];
      playerO = userList[1];
      let spectators = "";
      if(length > 2){
        for(var i=2; i<length;i++){ spectators = spectators + userList[i] + '\r' ; } 
      }

      return (
        <div class="users">
          <h1>{user}'s Tic Tac Toe</h1>
          <h2>Player X: {playerX}</h2>
          <h2>Player O: {playerO}</h2>
          <h3>Spectators: {spectators}</h3>
        </div>
      )
    }
  }
  
  function isSpectator(){
    let x = userList.indexOf(user);
    if(x>1) { return true;}
    return false;
  }
  
  useEffect(() => {
    socket.on('logging', (data) => {
      setLogIn(true);
    });
    socket.on('userlist', (data) => {
      setUsers(data);
    });
    socket.on('username', (data) => {
      setUserName(data);
    });
    
  }, []);

  
    return (
      <div class="container">
        {renderLogIn()}
        {renderUserList()}
        {renderBoard()}
      </div>
    );
}

export default App;