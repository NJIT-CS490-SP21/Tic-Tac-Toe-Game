import { useRef } from 'react';
import socket from "./Board.js";

export function LogIn(){
  
    const inputRef = useRef(null);
    
    function userLogIn(){
      const username = inputRef.current.value;
      if(username === ""){ return;}
      socket.emit('logging', { username: username });
    }
    
    function logInScreen(){
      return( 
        <div class='login'>
          <h2>Log In</h2>
          <input ref={inputRef} type='text' />
          <button onClick={userLogIn}>Log In</button>
        </div>
        );
    }
  
  return logInScreen();

}