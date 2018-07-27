import React, { Component } from 'react';
import axios from 'axios';
import { createClassFromSpec } from 'react-vega'

export default class Circle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:5000',
            data : {}
        }
    }

    componentDidMount() {
        axios.get(this.state.url+`/message/sum`,{
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
    render() {
        console.log(this.state.data)
        return (
          <div className="circle">
                {this.createView()}
                <div>
                    <div>
                        <span>
                            Xuân: 
                        </span>
                        {this.state.data.xuan}
                    </div>
                    <div>
                        <span>
                            Loan: 
                        </span>
                        {this.state.data.loan}
                    </div>
                </div>
          </div>
        );
      }
    createView() {
        const CustomizedChart = this.generateSpec()
        return <CustomizedChart
            renderer = "canvas"
            className = "chartWrapper" />
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
          "range": {"scheme": "pastel1"}
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