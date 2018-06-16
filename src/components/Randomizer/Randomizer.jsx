import './Randomizer.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import CheckboxWrapper from '../CheckboxWrapper/CheckboxWrapper';

const propTypes = {
  seed: PropTypes.string.isRequired,
  useSeed: PropTypes.bool.isRequired,
  onChangeSeed: PropTypes.func.isRequired,
  onToggleUseSeed: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

class Randomizer extends Component {
  onChange = (e) => {this.props.onChangeSeed(e.target.value)}

  render() {
    return (
      <div className="controlsBlock">
        <div className='randomizer'>
          <CheckboxWrapper
            defaultValue={this.props.useSeed}
            onToggle={this.props.onToggleUseSeed}
            title='Using seed'
          />
          <Input defaultValue={this.props.seed} onChange={this.props.onChangeSeed}
            title='Seed' type='text'
          />
          <button className='controlsBlock'
            onClick={this.props.onRandomClick} disabled={this.props.disabled}
            style={{alignSelf: 'center'}}
          >Random</button>
        </div>
      </div>
    );
  }
}

Randomizer.propTypes = propTypes;

export default Randomizer;
