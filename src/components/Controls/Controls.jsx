import './Controls.css';
import React, { Component } from 'react';
import { startGame, stopGame, changeSpeed, toggleBounds, reset, changeWidth, changeHeight, addPattern } from '../../redux/actions/game';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  isRunning: PropTypes.bool.isRequired,
  borders: PropTypes.bool.isRequired,
  speedRate: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
  onBoundsClick: PropTypes.func.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onChangeWidth: PropTypes.func.isRequired,
  onChangeHeight: PropTypes.func.isRequired,
  onGliederClick: PropTypes.func.isRequired,
  onGunClick: PropTypes.func.isRequired
};

class Controls extends Component {
  constructor (props) {
    super(props);
    this.row = React.createRef();
    this.col = React.createRef();
  }

  onChangeSpeed = (e) => { this.props.onChangeSpeed(parseInt(e.target.value, 10)); }
  onChangeWidth = (e) => { this.props.onChangeWidth(parseInt(e.target.value, 10)); }
  onChangeHeight = (e) => { this.props.onChangeHeight(parseInt(e.target.value, 10)); }
  onGliederClick = () => {
    this.props.onGliederClick(
      [[false, true, false],[false, false, true],[true, true, true]],
      this.row.current.value - 1,
      this.col.current.value - 1
    );
  }
  onGunClick = () => {
    this.props.onGliederClick(
      [
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 1,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,1, 0,0, 0,0, 0,0, 1,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,1, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,1, 0,0, 0,0, 1,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,1, 0],
        [0, 1, 1, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 1,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 1, 1, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 1,0, 1,1, 0,0, 0,0, 1,0, 1,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
        [0, 0, 0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0],
      ].map(sub => sub.map(v => v === 1 ? true: false)),
      this.row.current.value - 1,
      this.col.current.value - 1
    );
  }

  render() {
    return (
      <div className='controls'>
        <button onClick={this.props.onStartClick} disabled={this.props.isRunning}>Start</button>
        <button onClick={this.props.onStopClick} disabled={!this.props.isRunning}>Stop</button>
        <button onClick={this.props.onClearClick} disabled={this.props.isRunning}>Clear</button>
        <button onClick={this.props.onRandomClick} disabled={this.props.isRunning}>Random</button>
        <div className='inputWrapper' onClick={this.props.onBoundsClick}>
          <span>Borders</span>
          <input
            type='checkbox'
            checked={this.props.borders}
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
        <div className='patternsWrapper'>
          <div className='inputWrapper'>
            <span>Row</span>
            <input type="number" min="1" max={this.props.height}
              defaultValue={1}
              disabled={this.props.isRunning}
              ref={this.row}
            />
            <span>Col</span>
            <input type="number" min="1" max={this.props.width}
              defaultValue={1}
              disabled={this.props.isRunning}
              ref={this.col}
            />
          </div>
          <button onClick={this.onGliederClick} disabled={this.props.isRunning}>Glieder</button>
          <button onClick={this.onGunClick} disabled={this.props.isRunning || this.props.width < 38 || this.props.height < 11}>Gun</button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = propTypes;

function mapStateToProps (state) {
  return {
    isRunning: state.game.isRunning,
    borders: state.game.borders,
    speedRate: state.game.speedRate,
    width: state.game.width,
    height: state.game.height
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onStartClick: () => dispatch(startGame()),
    onStopClick: () => dispatch(stopGame()),
    onClearClick: () => dispatch(reset(false)),
    onRandomClick: () => dispatch(reset(true)),
    onBoundsClick: () => dispatch(toggleBounds()),
    onChangeSpeed: (value) => dispatch(changeSpeed(value)),
    onChangeWidth: (value) => dispatch(changeWidth(value)),
    onChangeHeight: (value) => dispatch(changeHeight(value)),
    onGliederClick: (pattern, i, j) => dispatch(addPattern(pattern, i, j)),
    onGunClick: (pattern, i, j) => dispatch(addPattern(pattern, i, j))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
