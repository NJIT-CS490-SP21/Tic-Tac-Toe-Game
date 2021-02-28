import { useState, useRef, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import './Board.css';
import React from 'react';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [userList, setUsers] = useState([]);
  const [user, setUserName] = useState("");
  let isSpect = isSpectator();
  let canStartGame = (userList.length >= 2) ? true: false;

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn && canStartGame) {
      return (
        <div>
          <h2>I am {user}</h2>
          <Board isSpectator={isSpect} userName={user} />;
        </div>
      )
      
    }
    return;
  }
  
  function renderUserList(){
    if(isLoggedIn){
      let length = userList.length;
      let playerX = userList[0];
      let playerO = userList[1];
      let spectators;
      if(length > 2){
        for(var i=2; i<length;i++){ spectators += userList[i] + '\n' ; } 
      }

      return (
        <div>
          <h3>Player X:</h3>
          {playerX}
          <h3>Player O:</h3>
          {playerO}
          <h3>Spectators:</h3>
          {spectators}
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
  }, []);
  
  useEffect(() => {
    socket.on('userlist', (data) => {
      setUsers(data);
    });
  }, []);
  
  useEffect(() => {
    socket.on('username', (data) => {
      setUserName(data);
    });
  }, []);
  
    return (
      <div class="container">
        {renderLogIn()}
        {renderUserList()}
        <div class="game">
          {renderBoard()}
        </div>
      </div>
    )
  
}

export default App;