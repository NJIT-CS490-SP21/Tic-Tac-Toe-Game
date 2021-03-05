import { useRef } from 'react';
import socket from "./Board.js";

export function LogIn(){
  
    const inputRef = useRef(null);
    
    function userLogIn(){
      const userName = inputRef.current.value;
      if(userName === ""){ return;}
      socket.emit('logging', { userName: userName });
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