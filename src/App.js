import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Circle from './circle_sum'
import Month from './month_sum'
import Week from './week_sum'
import Hour from './hour_sum'
import Shimmer from './shimmer' 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data : {}      
    }
  }

  
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <Circle/>
          <Month />
          <Week />
          <Hour />
      </div>
    );
  }
  
}

export default App;
