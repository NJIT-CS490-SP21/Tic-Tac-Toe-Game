import React, { useRef } from 'react';
import { socket } from './App.js';

export default function LogIn() {
  const inputRef = useRef(null);

  function userLogIn() {
    const username = inputRef.current.value;
    if (username === '') {
      return;
    }

    socket.emit('logging', { username });
  }

  function logInScreen() {
    return (
      <div className="login" role="login">
        <h2>Log into Game</h2>
        <input placeholder="Enter username" ref={inputRef} type="text" />
        <button type="button" onClick={userLogIn}>Log In</button>
      </div>
    );
  }

  return logInScreen();
}
