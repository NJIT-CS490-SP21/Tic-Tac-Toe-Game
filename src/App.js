import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import './Board.css';
import React from 'react';

const socket = io(); // Connects to socket connection

function App() {
  const [myBoard, setBoard] = useState(Array(9).fill(null));
  const [ isX, setTurn] = useState(true);
  const inputRef = useRef(null);
  const [isLoggedIn, setLogIn] = useState(false);
  
  function onClickSquare({index}){
    const newBoard = myBoard.slice();
    newBoard[index] = isX ? 'X':'O'; //check whose turn it is
    setBoard(newBoard);
    setTurn(!isX);
    socket.emit('tic', { index: index, myBoard: myBoard, isX: isX });
  }
  
  function logIn(){
    setLogIn(true);
    const userName = inputRef.current.value;
    socket.emit('logging', { userName: userName });
  }
  
  function Square({value, index}){
    if(isLoggedIn){
      return (<button class="box" onClick={ () => 
        onClickSquare({index})}>{value}
      </button>);
    }
    else{ return null }
  }
  
  function logInScreen(){
    if(!isLoggedIn){
      return( 
        <React.Fragments>
          <h1>Log In</h1>
          <input ref={inputRef} type='text' />
          <button onClick={logIn}>Log In</button>)
        </React.Fragments>
    )}
    else{ return null };
  }
  
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('tic', (data) => {
      console.log('Square click received!');
      console.log(data.isX);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      const newBoard = data.myBoard.slice();
      newBoard[data.index] = data.isX ? 'X':'O'; //check whose turn it is
      setBoard(newBoard);
      setTurn(!data.isX);
    });
  }, []);

  return (
    <div>
      {logInScreen}
      <div class="board">
        {myBoard.map((value, index) => <Square value={value} index={index} />)}
      </div>
    </div>
  );
}

export default App;