import './App.css';
import React, { Component } from 'react';
import Controls from '../Controls';
import GameLogic from '../../GameLogic';
import Grid from '../Grid';

class App extends Component {
  constructor (props) {
    super(props);
    this.gameLogic = new GameLogic();
    this.gameLogic.setCallbackOnChangeState(() => {
      this.setState({});
    });
  }

  onStartClick = () => { this.gameLogic.startTicker(50); }
  onStopClick = () => { this.gameLogic.stopTicker(); }
  onResetClick = () => { this.gameLogic.resetGrid(); }
  onRandomClick = () => { this.gameLogic.randomize(); }
  onChangeSpeed = (value) => { this.gameLogic.setSpeed(value); }
  onCellClick = (i, j) => { this.gameLogic.swapCell(i, j); }
  onBoundsClick = () => { this.gameLogic.toggleBounds(); }

  render() {
    return (
      <div className='app'>
        <div className='grid-container'>
          <Grid
            grid={this.gameLogic.grid}
            onCellClick={this.onCellClick}
          />
        </div>
        <Controls
          onStopClick={this.onStopClick}
          onResetClick={this.onResetClick}
          onRandomClick={this.onRandomClick}
          onBoundsClick={this.onBoundsClick}
          onChangeSpeed={this.onChangeSpeed}
        />
      </div>
    );
  }
}

export default App;
