import React from 'react';

//since displaying X or O is conditional and we
//need to control the onClick feature conditionally, we pass it as props
export function Square(props){
  return <button class="square" onClick={() => {props.onClick(props.index)}}> {props.value}
    </button>;
}
