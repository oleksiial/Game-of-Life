import './App.css';
import React, { Component } from 'react';
import Controls from '../Controls';
import Grid from '../Grid';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='grid-container'>
          <Grid/>
        </div>
        <Controls/>
      </div>
    );
  }
}

export default App;
