/* eslint-disable */
import React from 'react';

export default function Square(props) {
  return (
    <button
      className="square"
      type="button"
      onClick={() => {
        props.onClick(props.index);
      }}
    >
      {props.value}
    </button>
  );
}
