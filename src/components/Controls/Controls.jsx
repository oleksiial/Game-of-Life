import './Controls.css';
import React, { Component } from 'react';
import { startGame, stopGame, changeSpeed, toggleBounds, reset, changeWidth, changeHeight } from '../../redux/actions/game';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  isRunning: PropTypes.bool.isRequired,
  bounds: PropTypes.bool.isRequired,
  speedRate: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
  onBoundsClick: PropTypes.func.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onChangeWidth: PropTypes.func.isRequired,
  onChangeHeight: PropTypes.func.isRequired
};

class Controls extends Component {
  onChangeSpeed = (e) => { this.props.onChangeSpeed(parseInt(e.target.value, 10)); }
  onChangeWidth = (e) => { this.props.onChangeWidth(parseInt(e.target.value, 10)); }
  onChangeHeight = (e) => { this.props.onChangeHeight(parseInt(e.target.value, 10)); }

  render() {
    return (
      <div className='controls'>
        <button onClick={this.props.onStartClick} disabled={this.props.isRunning}>Start</button>
        <button onClick={this.props.onStopClick} disabled={!this.props.isRunning}>Stop</button>
        <button onClick={this.props.onResetClick} disabled={this.props.isRunning}>Reset</button>
        <button onClick={this.props.onRandomClick} disabled={this.props.isRunning}>Random</button>
        <div className='boundCheckBoxWrapper' onClick={this.props.onBoundsClick}>
          <span>Bounds</span>
          <input
            type='checkbox'
            checked={this.props.bounds}
            readOnly
          />
        </div>
        <div className='inputWrapper'>
          <span>Speed</span>
          <input type="number" min="1" max="100"
            defaultValue={this.props.speedRate}
            onChange={this.onChangeSpeed}
          />
        </div>
        <div className='inputWrapper'>
          <span>Width</span>
          <input type="number" min="1" max="100"
            defaultValue={this.props.width}
            onChange={this.onChangeWidth}
            disabled={this.props.isRunning}
          />
        </div>
        <div className='inputWrapper'>
          <span>Height</span>
          <input type="number" min="1" max="100"
            defaultValue={this.props.height}
            onChange={this.onChangeHeight}
            disabled={this.props.isRunning}
          />
        </div>
      </div>
    );
  }
}

Controls.propTypes = propTypes;

function mapStateToProps (state) {
  return {
    isRunning: state.game.isRunning,
    bounds: state.game.bounds,
    speedRate: state.game.speedRate,
    width: state.game.width,
    height: state.game.height
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onStartClick: () => dispatch(startGame()),
    onStopClick: () => dispatch(stopGame()),
    onResetClick: () => dispatch(reset(false)),
    onRandomClick: () => dispatch(reset(true)),
    onBoundsClick: () => dispatch(toggleBounds()),
    onChangeSpeed: (value) => dispatch(changeSpeed(value)),
    onChangeWidth: (value) => dispatch(changeWidth(value)),
    onChangeHeight: (value) => dispatch(changeHeight(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
