import './Grid.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleCell } from '../../redux/actions/game';

const propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  onCellClick: PropTypes.func.isRequired
};

class Grid extends Component {
  constructor (props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount () {
    this.updateCanvas();
  }

  componentDidUpdate () {
    this.updateCanvas();
  }

  onCellClick = (e) => {
    const i = (e.clientY - this.canvas.current.offsetTop) / 15 | 0;
    const j = (e.clientX - this.canvas.current.offsetLeft) / 15 | 0;
    this.props.onCellClick(i, j);
  }

  updateCanvas = () => {
    const ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0,0, 300, 300);
    this.props.grid.forEach((sub, i) => {
      sub.map((v, j) => {
        ctx.fillStyle = v? '#393': '#ddf';
        ctx.fillRect(j * 15, i * 15, 13, 13);
      });
    });
  }

  render() {
    return (
      <div className='grid'>
        <canvas
          width={this.props.grid[0].length * 15}
          height={this.props.grid.length * 15}
          ref={this.canvas}
          onClick={this.onCellClick}
        ></canvas>
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
