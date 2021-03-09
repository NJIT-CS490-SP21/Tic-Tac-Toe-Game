import { useRef } from 'react';
import socket from "./Board.js";
import { useState } from 'react';

export function LogIn(props){
  
    const inputRef = useRef(null);
    const userlist = props.userlist;

    function userLogIn(){
      const username = inputRef.current.value;
      if(username === ""){ return;}
    
      if(userlist["X"] == "") { userlist["X"] = username; }
      else if (userlist["X"] != "" && userlist["O"] == "") { userlist["O"] = username; }
      else { userlist["Spectators"].push(username); }
    
      socket.emit('logging', {userlist:userlist, username:username});
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