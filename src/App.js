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

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn) {
      return (
        <div>
          <h2>I am {user}</h2>
          <Board isSpectator={isSpect} />;
        </div>
      )
      
    }
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
  
  function isSpectator(){

    let x = userList.indexOf(user);
    console.log(userList);
    console.log(x);
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