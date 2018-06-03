import './Controls.css';
import React, { Component } from 'react';

class Controls extends Component {
    shouldComponentUpdate (newProps, newState) {
        return newProps.isRunning !== this.props.isRunning ||
            newProps.bounds !== this.props.bounds ||
            newProps.speedRate !== this.props.speedRate;
    }

    onChangeSpeed = (e) => {this.props.onChangeSpeed(e.target.value); }

    render() {
        return (
            <div className='controls'>
                <button
                    onClick={this.props.onStartClick}
                    disabled={this.props.isRunning}
                >Start</button>
                <button
                    onClick={this.props.onStopClick}
                    disabled={!this.props.isRunning}
                >Stop</button>
                <button onClick={this.props.onResetClick}>Reset</button>
                <button onClick={this.props.onRandomClick}>Random</button>
                <div
                    className='boundCheckBoxWrapper'
                    onClick={this.props.onBoundsClick}>
                    Bounds <input
                    type='checkbox'
                    checked={this.props.bounds}
                    readOnly
                />
                </div>
                <input
                    type="number"
                    min="1"
                    max="100"
                    defaultValue={this.props.speedRate}
                    onChange={this.onChangeSpeed}
                />
            </div>
        );
    }
}

export default Controls;
