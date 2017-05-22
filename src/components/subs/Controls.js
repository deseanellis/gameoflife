import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InitBoard, StartBoard, PauseBoard } from '../../actions/index';
import Generator from './Generator';

import _ from 'lodash';

class Controls extends Component {
  constructor(props) {
    super(props);

    //Binders
    this.onStartClick = this.onStartClick.bind(this);
    this.onPauseClick = this.onPauseClick.bind(this);
    this.onInitClick = this.onInitClick.bind(this);

    this.state = {
      intervalId: '',
      gridSize: 50
    };
  }

  componentDidUpdate(){
    if (this.props.pause && !this.props.start) {
      clearInterval(this.state.intervalId);
    }

  }

  render() {
    return(
      <div className="controls">
        <button className="btn btn-custom btn-start" onClick={() => this.onStartClick()}><i className="fa fa-play"></i> Start</button>
        <button className="btn btn-custom btn-pause" onClick={() => this.onPauseClick()}><i className="fa fa-pause"></i> Pause</button>
        <button className="btn btn-custom btn-clear" onClick={() => this.onInitClick("clear", [this.state.gridSize, this.state.gridSize])}><i className="fa fa-times"></i> Clear</button>
        <button className="btn btn-custom btn-random" onClick={() => this.onInitClick("random", [this.state.gridSize, this.state.gridSize])}><i className="fa fa-random"></i> Random</button>
        <button className={`btn btn-custom btn-40x40${(this.state.gridSize === 40 ? ' active' : '')}`} onClick={() => this.onInitClick("random", [40,40])}><i className="fa fa-th"></i> 40 x 40</button>
        <button className={`btn btn-custom btn-50x50${(this.state.gridSize === 50 ? ' active' : '')}`} onClick={() => this.onInitClick("random")}><i className="fa fa-th"></i> 50 x 50</button>
        <button className={`btn btn-custom btn-55x55${(this.state.gridSize === 55 ? ' active' : '')}`} onClick={() => this.onInitClick("random", [55,55])}><i className="fa fa-th"></i> 55 x 55</button>
        <Generator />
      </div>
    );
  }

  onInitClick(mode, size) {
    var gridSize = (size === undefined ? 50 : size[0])
    clearInterval(this.state.intervalId);
    this.setState({
      gridSize
    });
    this.props.InitBoard(mode, size);
  }

  onPauseClick() {
      this.props.PauseBoard(true);
  }

  onStartClick() {

    if (this.props.pause) {
      this.props.PauseBoard(false);
    }

    //Bind _this to React Environment (this)
    var _this = this;

    var intervalId = setInterval(function(){
      _this.props.StartBoard();
    }, 100);

    this.setState({
      intervalId: intervalId
    });
  }
}

function mapStateToProps(state) {
  return {
    start: state.board.start,
    pause: state.board.pause
  };
}


export default connect(mapStateToProps, { InitBoard, StartBoard, PauseBoard })(Controls);
