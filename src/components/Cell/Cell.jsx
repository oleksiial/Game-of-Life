import './Cell.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  value: PropTypes.bool.isRequired,
  onCellClick: PropTypes.func.isRequired
};

class Cell extends PureComponent {
  onClick = () => { this.props.onCellClick(this.props.i, this.props.j); }

  render() {
    const style = this.props.value ? {background: '#393'} : {background: '#ddf'};
    return (
      <div
        className='cell'
        onClick={this.onClick}
        style={style}
      />
    );
  }
}

Cell.propTypes = propTypes;

export default Cell;
