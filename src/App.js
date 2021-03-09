import React from 'react';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import { Leaderboard } from './Leaderboard.js';
import './Board.css';
import socket from "./Board.js";

function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState({"X":"", "O": "", "Spectators": []});
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  let playerX, playerO, isSpect, spectators;
  
  console.log(users);
  console.log(scores);
  
  const renderTable = scores.map((value, index) => {
        const score =users[index];
        return (
            <tr key={index}>
            <td>{value}</td>
            <td>{score}</td>
            </tr>
        );
    });

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
      return (
                <div>
                    <table>
                        <thead key="leaderboard">
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody >
                            {renderTable}
                        </tbody>
                    </table>
                </div>
            );
    }
  }
  
  /*function renderLeaderboard(){
    if(isLoggedIn){
      return(
        <div class="leaderboard">
          <Leaderboard scores={scores} users={users}/>
        </div>);
    }
  }*/
  
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
    <div class="container">
      {renderLogIn()}
      {renderUserlist()}
      {renderBoard()}
      {renderLeaderboard()}
    </div>
  );
}

export default App;