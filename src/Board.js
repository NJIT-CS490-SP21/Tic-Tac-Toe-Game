import React from 'react';
import { Box } from './Box.js';

function makeBoard({values, event}){
  return (
    <Box value={values[0]} onClick={event}/>
    <Box value={values[1]} onClick={event}/>
    <Box value={values[2]} onClick={event}/>
    <Box value={values[3]} onClick={event}/>
    <Box value={values[4]} onClick={event}/>
    <Box value={values[5]} onClick={event}/>
    <Box value={values[6]} onClick={event}/>
    <Box value={values[7]} onClick={event}/>
    <Box value={values[8]} onClick={event}/>
  );
}
