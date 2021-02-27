import React from 'react';
import { useRef } from 'react';
import socket from "./Board.js";

export function LogIn(){
  
    const inputRef = useRef(null);
    
    function userLogIn(){
        const userName = inputRef.current.value;
        socket.emit('logging', { userName: userName });
    }
    
    function logInScreen(){
      return( 
        <div>
          <h1>Log In</h1>
          <input ref={inputRef} type='text' />
          <button onClick={userLogIn}>Log In</button>
        </div>
        )
    }
  
  return logInScreen();

}