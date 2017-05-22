export const INIT_BOARD = 'INIT_BOARD';
export const PAUSE_BOARD = 'PAUSE_BOARD';
export const START_BOARD = 'START_BOARD';
export const CHANGE_CELL_STATE = 'CHANGE_CELL_STATE';

export function InitBoard(mode, size){
  //Two modes: clear or random
  return(
    {
      type: INIT_BOARD,
      mode,
      size
    }
  );
}

export function StartBoard(){
  return(
    {
      type: START_BOARD
    }
  );
}

export function PauseBoard(bool){
  return(
    {
      type: PAUSE_BOARD,
      payload: bool
    }
  );
}

export function ChangeCellState(id){
  return(
    {
      type: CHANGE_CELL_STATE,
      payload: id
    }
  );
}
