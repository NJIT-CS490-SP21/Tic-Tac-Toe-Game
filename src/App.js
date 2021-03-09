import React from 'react';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import { Leaderboard } from './Leaderboard.js';
import './Board.css';
import './Leaderboard.css';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState({"X":"", "O": "", "Spectators": []});
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [showScore, setShow] = useState([true]);
  let playerX, playerO, isSpect, spectators;

  function renderLogIn(){
    if(!isLoggedIn) {return <LogIn userlist={userlist} />;}
    return;
  }
  
  function renderBoard(){
    if(isLoggedIn) {
      isSpect=userlist["Spectators"].includes(user) ? true:false;
      return (
        <div>
          <Board user={user} playerX={playerX} playerO={playerO} isSpect={isSpect}/>
        </div>
      );
    }
    return;
  }
  
  function renderUserlist(){
    if(isLoggedIn){
      playerX = userlist.X;
      playerO = userlist.O;
      spectators = userlist.Spectators;

      return (
        <div class="users">
          <h1>{user}'s Tic Tac Toe</h1>
          <h2>Player X: {playerX}</h2>
          <h2>Player O: {playerO}</h2>
          <h3>Spectators: {spectators}</h3>
        </div>
      );
    }
  }
  
  
  function renderLeaderboard(){
    if(isLoggedIn){
      if(showScore){
        return(
          <div>
            <Leaderboard scores={scores} users={users} user={user}/>
          </div>);
        }
      }
  }
  
  function leaderboard(){
      if(isLoggedIn){
        return(
          <div>
            <button class="clickleader" onClick={() => {onClickLeaderboard()}}>Show/Hide Leaderboard</button>
          </div>
        );
      }
  }
  
  function onClickLeaderboard(){
    setShow(!showScore);
  }
  
  useEffect(() => {
    socket.on('logging', (data) => {
      setLogIn(true);
    });
    
    socket.on('userlist', (data) => {
      setUserlist(data);
    });
    
    socket.on('username', (data) => {
      setUser(data);
    });
    
    socket.on('update_score', (data) => {
      setScores(data[0]);
      setUsers(data[1]);
    });
  }, []);
  
  return (
    <div>
      <div class="container">
      {renderLogIn()}
      {renderUserlist()}
      {renderBoard()}
      </div>
      <div class="object">
        {leaderboard()}
        {renderLeaderboard()}
      </div>
    </div>
  );
}

export default App;