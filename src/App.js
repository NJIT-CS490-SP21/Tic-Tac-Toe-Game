/* eslint-disable */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Board from './Board.js';
import LogIn from './LogIn.js';
import Leaderboard from './Leaderboard.js';
import './Board.css';
import './Leaderboard.css';

const socket = io(); // Connects to socket connection
export { socket };

export default function App() {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState('');
  const [userlist, setUserlist] = useState({ X: '', O: '', Spectators: [] });
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  let playerX; let playerO; let isSpect; let
    spectators;

  function renderLogIn() {
    if (!isLoggedIn) {
      return <LogIn />;
    }
    return null;
  }

  function renderBoard() {
    if (isLoggedIn) {
      isSpect = !!userlist.Spectators.includes(user);
      return (
        <div>
          <Board
            user={user}
            playerX={playerX}
            playerO={playerO}
            isSpect={isSpect}
          />
        </div>
      );
    }

    return null;
  }

  function renderUserlist() {
    if (isLoggedIn) {
      playerX = userlist.X;
      playerO = userlist.O;
      spectators = userlist.Spectators;

      return (
        <div className="users">
          <h1>
            {user}
            's Tic Tac Toe
          </h1>
          <h2>
            Player X:
            {playerX}
          </h2>
          <h2>
            Player O:
            {playerO}
          </h2>
          <h3>
            Spectators:
            {spectators}
          </h3>
        </div>
      );
    }

    return null;
  }

  function renderLeaderboard() {
    if (isLoggedIn) {
      return (
        <div>
          <Leaderboard scores={scores} users={users} user={user} />
        </div>
      );
    }

    return null;
  }

  useEffect(() => {
    socket.on('logging', (data) => {
      setLogIn(true);
      setUser(data);
    });

    socket.on('userlist', (data) => {
      setUserlist(data);
    });

    socket.on('update_score', (data) => {
      setScores(data[0]);
      setUsers(data[1]);
    });
  }, []);

  return (
    <div>
      <div className="container">
        {renderLogIn()}
        <div className="inside" role="board">
          {renderUserlist()}
          {renderBoard()}
        </div>
      </div>
      <div className="object" role="leaderboard">
        {renderLeaderboard()}
      </div>
    </div>
  );
}
