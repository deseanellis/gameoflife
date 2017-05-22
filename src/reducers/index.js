import { combineReducers } from 'redux';
import BoardReducer from './reducer_board';

const rootReducer = combineReducers({
  board: BoardReducer
});

export default rootReducer;
