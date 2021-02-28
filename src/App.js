import { useState, useRef, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import './Board.css';
import React from 'react';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [userList, setUser] = useState([]);

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn) {return <Board/>;}
    return;
  }
  
  function renderUserList(){
    if(isLoggedIn){
      let length = userList.length;
      console.log(userList);
      let str = "Player X: " + userList[0] + " Player: O " + userList[1] + " Spectators: ";
      if(length > 2){
        for(var i=2; i<length;i++){ str = str + userList[i] + " "; } 
      }

      return str;
    }
  }
  
  useEffect(() => {
    socket.on('logging', (data) => {
      setLogIn(true);
    });
  }, []);
  
  useEffect(() => {
    socket.on('userlist', (data) => {
      setUser(data);
    });
  }, []);
  

    return (
      <div>
          {renderLogIn()}
          {renderUserList()}
        <div class="game">
          {renderBoard()}
        </div>
      </div>
    )
  
}

export default App;