import React, { Component } from 'react';
import { connect } from 'react-redux';

class Generator extends Component {
  render(){
    return(
      <div className="generator">Generations: <span>{this.props.generations}</span></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    generations: state.board.generations
  };
}

export default connect(mapStateToProps)(Generator);
