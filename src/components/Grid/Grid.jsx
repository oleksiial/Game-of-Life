import './Grid.css';
import React, { Component } from 'react';
import Cell from '../Cell';
import Controls from '../Controls';
import GameLogic from '../../GameLogic';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.state = {ticks: 0};
    this.gameLogic = new GameLogic(() => {this.setState({ticks: this.state.ticks + 1})});
  }

  onStartClick = () => { this.gameLogic.startTicker(); }
  onStopClick = () => { this.gameLogic.stopTicker(); }
  onResetClick = () => { this.gameLogic.resetGrid(); }
  onRandomClick = () => { this.gameLogic.randomize(); }
  onChangeRange = (e) => { this.gameLogic.setSpeed(e.target.value); }
  onCellClick = (i, j) => { this.gameLogic.swapCell(i, j); }

  render() {
    const grid = this.gameLogic.grid;
    return (
      <div>
        <div className='grid'>
          {
            grid.map((sub, i) => {
              return (
                <div className={'col'} key={i}>
                  {sub.map((v, j) => {
                    return (
                      <div key={j}>
                        <Cell i={i} j={j} onCellClick={this.onCellClick} value={v} />
                      </div>
                    );
                  })}
                </div>
              );
            })
          }
        </div>
        <Controls
          onStartClick={this.onStartClick}
          onStopClick={this.onStopClick}
          onResetClick={this.onResetClick}
          onRandomClick={this.onRandomClick}
          onChangeRange={this.onChangeRange}
        />
      </div>
    );
  }
}

export default Grid;
