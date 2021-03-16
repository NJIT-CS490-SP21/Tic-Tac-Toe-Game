import React from "react";
import { useState, useEffect } from "react";
import { Board } from "./Board.js";
import { LogIn } from "./LogIn.js";
import { Leaderboard } from "./Leaderboard.js";
import "./Board.css";
import "./Leaderboard.css";
import io from "socket.io-client";

const socket = io(); // Connects to socket connection
export { socket };

export default function App() {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState({ X: "", O: "", Spectators: [] });
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  let playerX, playerO, isSpect, spectators;

  function renderLogIn() {
    if (!isLoggedIn) {
      return <LogIn />;
    }
    return;
  }

  function renderBoard() {
    if (isLoggedIn) {
      isSpect = userlist["Spectators"].includes(user) ? true : false;
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
    return;
  }

  function renderUserlist() {
    if (isLoggedIn) {
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

  function renderLeaderboard() {
    if (isLoggedIn) {
      return (
          <div>
            <Leaderboard scores={scores} users={users} user={user} />
          </div>
        );
    }
  }

  useEffect(() => {
    socket.on("logging", (data) => {
      setLogIn(true);
      setUser(data);
    });

    socket.on("userlist", (data) => {
      setUserlist(data);
    });

    socket.on("update_score", (data) => {
      setScores(data[0]);
      setUsers(data[1]);
    });
  }, []);

  return (
    <div>
      <div class="container">
        {renderLogIn()}
        <div class="inside" role="board">
          {renderUserlist()}
          {renderBoard()}
        </div>
      </div>
      <div class="object">
        {renderLeaderboard()}
      </div>
    </div>
  );
}
