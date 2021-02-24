import React from 'react';
//import './Board.css';

export function Square({value, index, onClick}){
  return <button class="square">
        {value}
    </button>
}