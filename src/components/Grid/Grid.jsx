import './Grid.css';
import React, { Component } from 'react';
import Cell from '../Cell';
import PropTypes from 'prop-types';

const propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  onCellClick: PropTypes.func.isRequired
};

class Grid extends Component {
    onCellClick = (i, j) => { this.props.onCellClick(i, j); }

    render() {
        const { grid } = this.props;
        return (
            <div className='grid'>
                {
                    grid.map((sub, i) => {
                        return (
                            <div className={'row'} key={i}>
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

Grid.propTypes = propTypes;

export default Grid;
