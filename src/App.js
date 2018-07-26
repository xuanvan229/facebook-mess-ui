import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Circle from './circle_sum'

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
          
      </div>
    );
  }
  
}

export default App;
