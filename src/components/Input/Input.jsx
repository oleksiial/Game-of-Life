import './Input.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string
};

const defaultProps = {
  title: '',
  disabled: false,
  type: 'number',
  min: 1,
  max: Infinity,
  className: ''
};

class Input extends Component {
  onChange = (e) => {
    typeof(this.props.defaultValue) === 'number'
      ? this.props.onChange(parseInt(e.target.value, 10))
      : this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className={'inputWrapper ' + this.props.className}>
        <span>{this.props.title}</span>
        <input type={this.props.type} min={this.props.min} max={this.props.max}
          value={this.props.defaultValue}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
