import './Controls.css';
import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <div className='controls'>
        <button onClick={this.props.onStartClick}>Start</button>
        <button onClick={this.props.onStopClick}>Stop</button>
        <button onClick={this.props.onResetClick}>Reset</button>
        <button onClick={this.props.onRandomClick}>Random</button>
        {/* <input type="range" min="1" max="100" onInput={this.props.onChangeRange}/> */}
      </div>
    );
  }
}

export default Controls;
