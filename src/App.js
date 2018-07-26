import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { createClassFromSpec } from 'react-vega'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data : {}      
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/message/sum`,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        const result = res.data;
        this.setState(prevState => ({
          data: result
        }));
      })
  }
  createView(){
		// const { ready } = this.fetcher
		// const { noData, errorData } = this.lang
		// const { error } = this.state
		// const { data } = this.chartData
		const CustomizedChart = this.generateSpec()
		// if(!error && !(_.isEmpty(data)))
			return <CustomizedChart
				renderer="canvas"
				// onSignalDrilldown={this.handleClick}
				className="chartWrapper" />
		// if(!error && ready && _.isEmpty(data))
		// 	return <Card.Alert color="info" className="mt-0">{noData}</Card.Alert>
		// if(error)
		// 	return <Card.Alert color="danger" className="mt-0">{errorData}</Card.Alert>
		
		// return null
	}
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          {this.createView()}
          
      </div>
    );
  }
  generateSpec = () => {
		return createClassFromSpec({
      "$schema": "https://vega.github.io/schema/vega/v4.json",
      "width": 200,
      "height": 200,
      "autosize": "none",
    
      "data": [
        {
          "name": "table",
          "values": [
            {"id": 1, "field": this.state.data.xuan},
            {"id": 2, "field": this.state.data.loan}
          ],
          "transform": [
            {
              "type": "pie",
              "field": "field",
              "startAngle": 0,
              "endAngle": 6.29
            }
          ]
        }
      ],
    
      "scales": [
        {
          "name": "color",
          "type": "ordinal",
          "range": {"scheme": "category20"}
        }
      ],
    
      "marks": [
        {
          "type": "arc",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "fill": {"scale": "color", "field": "id"},
              "x": {"signal": "width / 2"},
              "y": {"signal": "height / 2"},
              "startAngle": {"field": "startAngle"},
              "endAngle": {"field": "endAngle"}
            },
            "update": {
              "innerRadius": {"value": "0"},
              "outerRadius": {"signal": "width/2"}
            }
          }
        }
      ]
    })
	}
}

export default App;
