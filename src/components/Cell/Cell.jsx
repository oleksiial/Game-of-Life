import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  onClick = () => {
    this.props.onCellClick(this.props.i, this.props.j);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.value !== this.props.value;
  }

  render() {
    const style = this.props.value ? {background: '#393'} : {background: '#ddf'};
    return (
      <div
        className='cell'
        onClick={this.onClick}
        style={style}
      />
    );
  }
}

export default Cell;
