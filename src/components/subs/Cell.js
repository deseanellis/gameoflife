import React, { Component } from 'react';

class Cell extends Component {
  render() {
    var _className = (this.props.alive) ? 'cell alive' : 'cell';
    return(
      <td id={this.props.id} className={_className} onClick={this.props.clickHandler}></td>
    );
  }
}

export default Cell;
