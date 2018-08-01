import React, { Component } from 'react';
import axios from 'axios';
import { createClassFromSpec } from 'react-vega'

export default class Week extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:5000',
            week : undefined
        }
    }

    componentDidMount() {
        axios.get(this.state.url+`/message/week`,{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            const result = res.data;
            this.setState(prevState => ({
                week: result
            }));
        }).catch(err => {
            console.log('err', err)
        })
    }

    render() {
        console.log(this.state.week)
        return (
          <div className="circle">
                {this.createView()}
          </div>
        );
    }

    createView() {
        if (!this.state.week) return null
        const CustomizedChart = this.generateSpec()
        return <CustomizedChart
            renderer = "canvas"
            className = "chartWrapper" />
    }

    generateSpec = () => {
		return createClassFromSpec({
            "$schema": "https://vega.github.io/schema/vega/v4.json",
            "width": 500,
            "height": 200,
            "padding": 5,
          
            "data": [
              {
                "name": "table",
                "values": [
                  {"x": "Mon", "y": this.state.week.xuan.mon, "c":0}, {"x": "Mon", "y": this.state.week.loan.mon, "c":1},
                  {"x": "Tue", "y": this.state.week.xuan.tue, "c":0}, {"x": "Tue", "y": this.state.week.loan.tue, "c":1},
                  {"x": "Web", "y": this.state.week.xuan.web, "c":0}, {"x": "Web", "y": this.state.week.loan.web, "c":1},
                  {"x": "Thu", "y": this.state.week.xuan.thu, "c":0}, {"x": "Thu", "y": this.state.week.loan.thu, "c":1},
                  {"x": "Fri", "y": this.state.week.xuan.fri, "c":0}, {"x": "Fri", "y": this.state.week.loan.fri, "c":1},
                  {"x": "Sat", "y": this.state.week.xuan.sat, "c":0}, {"x": "Sat", "y": this.state.week.loan.sat, "c":1},
                  {"x": "Sun", "y": this.state.week.xuan.sun, "c":0}, {"x": "Sun", "y": this.state.week.loan.sun, "c":1}
                ],
                "transform": [
                  {
                    "type": "stack",
                    "groupby": ["x"],
                    "sort": {"field": "c"},
                    "field": "y"
                  }
                ]
              }
            ],
          
            "scales": [
              {
                "name": "x",
                "type": "band",
                "range": "width",
                "domain": {"data": "table", "field": "x"}
              },
              {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": true, "zero": true,
                "domain": {"data": "table", "field": "y1"}
              },
              {
                "name": "color",
                "type": "ordinal",
                "range": {"scheme": "pastel1"}
              }
            ],
          
            "axes": [
              {"orient": "bottom", "scale": "x", "zindex": 1},
              {"orient": "left", "scale": "y", "zindex": 1}
            ],
          
            "marks": [
              {
                "type": "rect",
                "from": {"data": "table"},
                "encode": {
                  "enter": {
                    "x": {"scale": "x", "field": "x"},
                    "width": {"scale": "x", "band": 1, "offset": -1},
                    "y": {"scale": "y", "field": "y0"},
                    "y2": {"scale": "y", "field": "y1"},
                    "fill": {"scale": "color", "field": "c"}
                  },
                  "update": {
                    "fillOpacity": {"value": 1}
                  },
                  "hover": {
                    "fillOpacity": {"value": 0.5}
                  }
                }
              }
            ]
        })
	}
}