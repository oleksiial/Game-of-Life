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
    const ctx = this.canvas.current.getContext('2d', { alpha: false });
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0,0, this.props.cellSize * this.props.width, this.props.cellSize * this.props.height);
    ctx.fillStyle = '#393';

    this.props.grid.forEach((sub, i) => {
      ctx.moveTo(0,i*this.props.cellSize);
      ctx.lineTo(this.props.width*this.props.cellSize,i*this.props.cellSize);
      sub.forEach((v, j) => {
        if (v) {
          ctx.fillRect(j * this.props.cellSize, i * this.props.cellSize, this.props.cellSize, this.props.cellSize);
        }
      });
    });

    if (this.props.cellSize > 3) {
      ctx.strokeStyle='#888';
      ctx.beginPath();
      for (let i = 1; i < this.props.height + 1; i++) {
        // +0.5 to avoid blurry lines
        ctx.moveTo(0.5,i*this.props.cellSize+0.5);
        ctx.lineTo(0.5+this.props.width*this.props.cellSize,i*this.props.cellSize+0.5);
      }
      for (let i = 1; i < this.props.width + 1; i++) {
        ctx.moveTo(i*this.props.cellSize+0.5, 0.5);
        ctx.lineTo(i*this.props.cellSize+0.5, this.props.height*this.props.cellSize+0.5);
      }
      ctx.stroke();
    }
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
