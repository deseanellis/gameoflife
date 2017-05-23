import { INIT_BOARD, START_BOARD, PAUSE_BOARD, CHANGE_CELL_STATE } from '../actions/index';

const BOARD_SIZE = [50, 50]; //Rows and Columns
const INITIALISER = 6; //Higher the number the lower the initial starting cells, lower the number the higher the initial starting cells
const INITIAL_STATE = {cellState: [], boardSize: BOARD_SIZE, rows: [], cols: [], start: false, pause: false, generations: 0};

const BoardReducer = (state=INITIAL_STATE, action) => {
  var _tmp = [];
  switch (action.type) {
    case INIT_BOARD:
      const size = (action.size === undefined) ? [50,50] : action.size;
      const rows = getRowsAndCols(size)[0];
      const cols = getRowsAndCols(size)[1];
      const BOARD_CELLS = buildBoard(size, action.mode, INITIALISER);
      return {...state, cellState: BOARD_CELLS, rows, cols, generations: 0, boardSize: size, start: false, pause: false}
      case PAUSE_BOARD:
        return {...state, pause: action.payload, start: !action.payload}
    case START_BOARD:
      _tmp = cloneObj(state.cellState);

      for (let i = 0; i < _tmp.length; i++) {
        let count = countActiveNeighbors(i, state.cellState, state.boardSize);
        _tmp[i].neighbors = count;

        if (state.cellState[i].alive) {
          if (count === 2 || count === 3) {
            _tmp[i].alive = true;
          } else {
            _tmp[i].alive = false;
          }
        } else {
          if (count === 3) {
            _tmp[i].alive = true;
          } else {
            _tmp[i].alive = false;
          }
        }

      }
      var new_gen = state.generations + 1;
      return {...state, start: true, pause: false, cellState: _tmp, generations: new_gen}
    case CHANGE_CELL_STATE:
      _tmp = cloneObj(state.cellState);
      _tmp[action.payload].alive = !state.cellState[action.payload].alive;
      return {...state, cellState: _tmp}
    default:
      return state;
  }
}

//REDUCER FUNCTIONS
function countActiveNeighbors(id, cellState, boardSize) {
  //Get Columns and Rows from Grid
  var cols = boardSize[1];
  var rows = boardSize[0];

  //Find Row and Column
  var row = Math.floor(id/cols);
  var col = id - (row * cols);

  //Array of all neighboring Ids
  var _ids = getNeighborIds(row, col, cols, rows);

  //For each one of the neighboring Ids, count the active ones

  var count = 0;
  for (let i = 0; i < _ids.length; i++) {
    if (cellState[_ids[i]].alive) {
      count++;
    }
  }
  return count;
}

function getNeighborIds(row, col, x, y){
  //x is number of columns
  //y is the number of rows

  /********************************
  Build array of 8 neighbouring IDS
  ********************************/

  //Left-Right
  var right = [row, (col + 1 >= x) ? 0 : col + 1 ];
  var left = [row, (col - 1 < 0) ? x-1 : col - 1 ];

  //Top-Bottom
  var top = [(row - 1 < 0) ? y-1 : row - 1, col];
  var bottom = [(row + 1 >= y) ? 0 : row + 1, col];

  //Top-Left and Top-Right
  var topLeft = [(row - 1 < 0) ? y-1 : row - 1, (col - 1 < 0) ? x-1 : col - 1 ];
  var topRight = [(row - 1 < 0) ? y-1 : row - 1, (col + 1 >= x) ? 0 : col + 1];

  //Bottom-Left and Bottom-Right
  var bottomLeft = [(row + 1 >= y) ? 0 : row + 1, (col - 1 < 0) ? x-1 : col - 1 ];
  var bottomRight = [(row + 1 >= y) ? 0 : row + 1, (col + 1 >= x) ? 0 : col + 1];

  var _ids = convertToId(x ,right, left, top, bottom, topLeft, topRight, bottomLeft, bottomRight);

  return _ids;

}

function convertToId(size, ...args) {
  return args.map((cell) => {
    //Where size is the number of columns
    return (cell[0] * size) + cell[1];
  });
}


function buildBoard(size, mode, initialiser) {
  //Cells to generateCells
  var ctg = size[0] * size[1];

  var cells = [];
  for (let i = 0; i < ctg; i++) {
    var random = Math.floor(Math.random() * initialiser);
    if (mode === "random") {
      cells[i] = {alive: (random === 0) ? true : false, neighbors: 0 };
    } else if (mode === "clear") {
      cells[i] = {alive: false, neighbors: 0 };
    }

  }

  return cells;
}

function getRowsAndCols(BOARD_SIZE) {
  var rowsAndCols = [];
  var rows = [];
  var cols = [];

  //Get Rows
  for(let i = 0; i < BOARD_SIZE[0]; i++) {
    rows.push(i);
  }

  //Get Columns
  for(let i = 0; i < BOARD_SIZE[1]; i++) {
    cols.push(i);
  }

  rowsAndCols.push(rows);
  rowsAndCols.push(cols);

  return rowsAndCols;
}

function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default BoardReducer;
