/* eslint-disable */
import React from 'react';

export default function Square(props) {
  const { click } = props.onClick;
  const { index } = props.index;
  const { value } = props.value;

  return (
    <button
      className="square"
      type="button"
      onClick={() => {
        click(index);
      }}
    >
      {value}
    </button>
  );
}
