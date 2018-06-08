import './Grid.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleCell } from '../../redux/actions/game';

const propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
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
    const i = (e.clientY - this.canvas.current.offsetTop) / this.props.cellSize | 0;
    const j = (e.clientX - this.canvas.current.offsetLeft) / this.props.cellSize | 0;
    this.props.onCellClick(i, j);
  }

  updateCanvas = () => {
    const ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0,0, this.props.cellSize * this.props.width, this.props.cellSize * this.props.height);
    this.props.grid.forEach((sub, i) => {
      sub.forEach((v, j) => {
        ctx.fillStyle = v? '#393': '#ddf';
        ctx.fillRect(j * this.props.cellSize, i * this.props.cellSize, this.props.cellSize, this.props.cellSize);
      });
    });
  }

  render() {
    return (
      <div className='grid'>
        <canvas
          width={this.props.cellSize * this.props.width}
          height={this.props.cellSize * this.props.height}
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
    grid: state.game.grid,
    width: state.game.width,
    height: state.game.height,
    cellSize: state.game.cellSize
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCellClick: (i, j) => dispatch(toggleCell(i, j))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
