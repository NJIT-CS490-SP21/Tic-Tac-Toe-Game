import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {
  const [myBoard, setBoard] = useState(Array(9).fill("O"));
  
  function onClickSquare(index){
    const newBoard = myBoard.slice();
    newBoard[index] = 'X';
    setBoard((prev => {[newBoard]});
    socket.emit('click', { index: index });
  }
  
  function Square({value, index}){
    return <button class="square" onClick={ () => onClickSquare({index})}>
          {value}
      </button>;
  }
  
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('click', (data) => {
      console.log('User input received!');
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      const newBoard = myBoard.slice();
      newBoard[data] = 'X';
      setBoard(newBoard);
    });
  }, []);

  return (
      <div class="board">
      <h1>My Tic Tac Toe Board</h1>
      <h2>{myBoard}</h2>

        <div class ="box">
          {myBoard.map((value, index) => <Square value={value} index={index} />)}
        </div>
      </div>
  );
}

export default App;