import React from 'react';
import { useState, useRef } from 'react';

export function LogIn(){
    const [isLoggedIn, setLogIn] = useState(false);
    const inputRef = useRef(null);
    
    function returnUser(){
        setLogIn(true);
        const userName = inputRef.current.value;
        return console.log("im here");
    }
    
    function logInScreen(){
        if(!isLoggedIn){
          return( 
            <div>
              <h1>Log In</h1>
              <input ref={inputRef} type='text' />
              <button onClick={returnUser}>Log In</button>
            </div>
            )}
        else{return null}
    }
  
  return logInScreen();

}