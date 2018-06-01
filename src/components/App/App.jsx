import './App.css';
import React, { Component } from 'react';
import Controls from '../Controls';
import GameLogic from '../../GameLogic';
import Grid from '../Grid';

class App extends Component {
  constructor (props) {
    super(props);
    this.gameLogic = new GameLogic();
  }

  onStartClick = () => { this.gameLogic.startTicker(); }
  onStopClick = () => { this.gameLogic.stopTicker(); }
  onResetClick = () => { this.gameLogic.resetGrid(); }
  onRandomClick = () => { this.gameLogic.randomize(); }
  // onChangeRange = (value) => { this.gameLogic.setSpeed(value); }

  render() {
    return (
      <div className='app'>
        <div className='grid-container'>
          <Grid gameLogic={this.gameLogic}/>
        </div>
        <Controls
          onStartClick={this.onStartClick}
          onStopClick={this.onStopClick}
          onResetClick={this.onResetClick}
          onRandomClick={this.onRandomClick}
        />
      </div>
    );
  }
}

export default App;
