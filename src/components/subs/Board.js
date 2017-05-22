import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InitBoard, ChangeCellState } from '../../actions/index';

import Cell from './Cell';


class Board extends Component {

  componentDidMount(){
    this.props.InitBoard("random");
  }

  render() {
    return(
      <div>
        <table className="board">
          <tbody>
            {
              this.props.rows.map((row, i) => {
                return(
                  <tr key={i}>
                    {
                      this.props.cols.map((col, j) => {
                        var id = (i * this.props.cols.length) + j;
                        return(
                          <Cell
                            key={j}
                            id={id}
                            clickHandler={() => this.onCellClick(id)}
                            alive={this.props.cellState[id].alive}
                          />
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  onCellClick(id) {
    this.props.ChangeCellState(id);
  }

}

function mapStateToProps(state) {
  return {
    cellState: state.board.cellState,
    rows: state.board.rows,
    cols: state.board.cols
  };
}

export default connect(mapStateToProps, { InitBoard, ChangeCellState })(Board);
