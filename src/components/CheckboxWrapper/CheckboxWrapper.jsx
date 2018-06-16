import './CheckboxWrapper.css';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  defaultValue: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

const defaultProps = {
  title: '',
  className: ''
}

const CheckboxWrapper = (props) => <div className={'checkboxWrapper ' + props.className} onClick={props.onToggle}>
  <span>{props.title}</span>
  <input type='checkbox' checked={props.defaultValue} readOnly />
</div>

CheckboxWrapper.propTypes = propTypes;
CheckboxWrapper.defaultProps = defaultProps;

export default CheckboxWrapper;
