import React from 'react';
import Board from './subs/Board';
import Controls from './subs/Controls';

export default function Content(props) {
  return(
    <div className="content">
      <div className="board-wrapper">
      <Board />
      </div>
      <Controls />
    </div>
  );
}
