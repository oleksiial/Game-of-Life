import './Grid.css';
import React, { Component } from 'react';
import Cell from '../Cell';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleCell } from '../../redux/actions/game';

const propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  onCellClick: PropTypes.func.isRequired
};

class Grid extends Component {
  onCellClick = (i, j) => { this.props.onCellClick(i, j); }

  render() {
    return (
      <div className='grid'>
        {
          this.props.grid.map((sub, i) => {
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

function mapStateToProps (state) {
  return {
    grid: state.game.grid
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCellClick: (i, j) => dispatch(toggleCell(i, j))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
