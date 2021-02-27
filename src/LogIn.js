import React from 'react';
import { useState, useRef } from 'react';
import socket from "./Board.js";

export function LogIn(){
  
    const [isLoggedIn, setLogIn] = useState(false);
    const inputRef = useRef(null);
    
    function userLogIn(){
        setLogIn(true);
        const userName = inputRef.current.value;
        socket.emit('logging', { userName: userName });
    }
    
    function logInScreen(){
        if(!isLoggedIn){
          return( 
            <div>
              <h1>Log In</h1>
              <input ref={inputRef} type='text' />
              <button onClick={userLogIn}>Log In</button>
            </div>
            )}
        else{return null}
    }
  
  return logInScreen();

}