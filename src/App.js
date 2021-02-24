import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import './Board.css';

const socket = io(); // Connects to socket connection

function App() {
  const [myBoard, setBoard] = useState(Array(9).fill("O"));
  
  function onClickSquare({index}){
    //const newBoard = [...myBoard];
    const newBoard = myBoard.slice();
    newBoard[index] = 'X';
    setBoard(prevBoard => newBoard);
    socket.emit('tic', { index: index, myBoard: myBoard });
  }
  
  function Square({value, index}){
    return <button class="box" onClick={ () => onClickSquare({index})}>
          {value}
      </button>;
  }
  
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('tic', (data) => {
      console.log('User input received!');
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      const newBoard = data.myBoard.slice();
      newBoard[data.index] = 'X';
      setBoard(prevBoard => newBoard);
    });
  }, []);

  return (
      <div class="board">
        {myBoard.map((value, index) => <Square value={value} index={index} />)}
      </div>
  );
}

export default App;