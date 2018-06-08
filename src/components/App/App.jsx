import './App.css';
import React, { Component } from 'react';
import Controls from '../Controls';
import Grid from '../Grid';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Controls/>
        <Grid/>
      </div>
    );
  }
}

export default App;
