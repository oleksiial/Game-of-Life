import './Controls.css';
import React, { Component } from 'react';
import { startGame, stopGame, changeSpeed, toggleBounds,
  changeWidth, changeHeight, addPattern, changeCellSize, setSeed, setUseSeed, clear, randomize } from '../../redux/actions/game';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input';
import * as patterns from '../../redux/actions/patterns';
import Randomizer from '../Randomizer/Randomizer';
import CheckboxWrapper from '../CheckboxWrapper/CheckboxWrapper';

const propTypes = {
  isRunning: PropTypes.bool.isRequired,
  borders: PropTypes.bool.isRequired,
  speedRate: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  seed: PropTypes.string,
  useSeed: PropTypes.bool.isRequired,
  nGenerations: PropTypes.number.isRequired,

  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
  onBoundsClick: PropTypes.func.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onChangeWidth: PropTypes.func.isRequired,
  onChangeCellSize: PropTypes.func.isRequired,
  onChangeHeight: PropTypes.func.isRequired,
  onChangeSeed: PropTypes.func.isRequired,
  onChangeUseSeed: PropTypes.func.isRequired,
  onPatternClick: PropTypes.func.isRequired
};

class Controls extends Component {
  constructor (props) {
    super(props);
    this.row = React.createRef();
    this.col = React.createRef();
  }

  onGliederClick = () => {
    this.props.onPatternClick(
      patterns.smallGlider,
      this.row.current.value - 1,
      this.col.current.value - 1
    );
  }
  onGunClick = () => {
    this.props.onPatternClick(
      patterns.goslingsGun,
      this.row.current.value - 1,
      this.col.current.value - 1
    );
  }

  render() {
    return (
      <div className='controls'>
        <button className='controlsBlock' onClick={this.props.onStartClick} disabled={this.props.isRunning}>Start</button>
        <button className='controlsBlock' onClick={this.props.onStopClick} disabled={!this.props.isRunning}>Stop</button>
        <button className='controlsBlock' onClick={this.props.onClearClick} disabled={this.props.isRunning}>Clear</button>
        <Randomizer
          seed={this.props.seed}
          useSeed={this.props.useSeed}
          onChangeSeed={this.props.onChangeSeed}
          onToggleUseSeed={this.props.onChangeUseSeed}
          onRandomClick={this.props.onRandomClick}
          disabled={this.props.isRunning}
        />
        <CheckboxWrapper
          className='controlsBlock'
          defaultValue={this.props.borders}
          onToggle={this.props.onBoundsClick}
          title='Borders'
        />
        <Input className='controlsBlock'
          defaultValue={this.props.speedRate} onChange={this.props.onChangeSpeed}
          title='Speed u/s' max={50}
        />
        <Input className='controlsBlock'
          defaultValue={this.props.width} onChange={this.props.onChangeWidth}
          title='Width' disabled={this.props.isRunning}
        />
        <Input className='controlsBlock'
          defaultValue={this.props.height}onChange={this.props.onChangeHeight}
          title='Height'  disabled={this.props.isRunning}
        />
        <Input className='controlsBlock'
          defaultValue={this.props.cellSize} onChange={this.props.onChangeCellSize}
          title='Cell size'
        />
        {/* <div className='patternsWrapper'>
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
        </div> */}
        <div className='controlsBlock'>
          <span>Generation: {this.props.nGenerations}</span>
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
    height: state.game.height,
    cellSize: state.game.cellSize,
    nGenerations: state.game.nGenerations,
    seed: state.game.seed,
    useSeed: state.game.useSeed
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onStartClick: () => dispatch(startGame()),
    onStopClick: () => dispatch(stopGame()),
    onClearClick: () => dispatch(clear()),
    onRandomClick: () => dispatch(randomize(true)),
    onBoundsClick: () => dispatch(toggleBounds()),
    onChangeSpeed: (value) => dispatch(changeSpeed(value)),
    onChangeWidth: (value) => dispatch(changeWidth(value)),
    onChangeHeight: (value) => dispatch(changeHeight(value)),
    onChangeCellSize: (value) => dispatch(changeCellSize(value)),
    onPatternClick: (pattern, i, j) => dispatch(addPattern(pattern, i, j)),
    onChangeSeed: (seed) => dispatch(setSeed(seed)),
    onChangeUseSeed: (value) => dispatch(setUseSeed(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
