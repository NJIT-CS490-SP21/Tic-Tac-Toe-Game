import React from 'react';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import './Board.css';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [myUserlist, setUserlist] = useState({});
  const [user, setUser] = useState("");
  let playerX, playerO, spectators;

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn/>;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn) {
      return (
        <div>
          <Board user={user} playerX={playerX} playerO={playerO} spectators={spectators} />
        </div>
      );
    }
    return;
  }
  
  function renderUserlist(){
    if(isLoggedIn){
      let lst="";
      playerX = myUserlist["Player X"];
      playerO = myUserlist["Player O"];
      spectators = myUserlist["Spectators"];
      
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
  
  /*function renderLeaderboard(){
    if(isLoggedIn){
      return(
        <div class="leaderboard">
          <Leaderboard scores={userlist}/>
        </div>);
    }
  }*/
  
  useEffect(() => {
    socket.on('logging', (data) => {
      setLogIn(true);
    });
  }, []);
  
  useEffect(() => {
    socket.on('userlist', (data) => {
      setUserlist(data);
    });
  }, []);
  
  useEffect(() => {
    socket.on('username', (data) => {
      setUser(data);
    });
  }, []);

  return (
    <div class="container">
      {renderLogIn()}
      {renderUserlist()}
      {renderBoard()}
    </div>
  );
}

export default App;