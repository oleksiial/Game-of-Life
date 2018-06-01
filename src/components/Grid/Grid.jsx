import './Grid.css';
import React, { Component } from 'react';
import Cell from '../Cell';

class Grid extends Component {
  constructor (props) {
    super(props);
    this.props.gameLogic.setCallbackOnChangeState(() => {this.setState({})});
  }

  onCellClick = (i, j) => { this.props.gameLogic.swapCell(i, j); }

  render() {
    const grid = this.props.gameLogic.grid;
    return (
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
    );
  }
}

export default Grid;
