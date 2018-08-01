import React, { Component } from 'react';
import axios from 'axios';
import { createClassFromSpec } from 'react-vega'

export default class Hour extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:5000',
            hour : undefined
        }
    }

    componentDidMount() {
        axios.get(this.state.url+`/message/hour`,{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            const result = res.data;
            this.setState(prevState => ({
                hour: result
            }));
        }).catch(err => {
            console.log('err', err)
        })
    }

    render() {
        console.log(this.state.hour)
        return (
          <div className="circle">
                {this.createView()}
          </div>
        );
    }

    createView() {
        if (!this.state.hour) return null
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
                  {"x": "0", "y": this.state.hour.xuan._0, "c":0}, {"x": "0", "y": this.state.hour.loan._0, "c":1},
                  {"x": "1", "y": this.state.hour.xuan._1, "c":0}, {"x": "1", "y": this.state.hour.loan._1, "c":1},
                  {"x": "2", "y": this.state.hour.xuan._2, "c":0}, {"x": "2", "y": this.state.hour.loan._2, "c":1},
                  {"x": "3", "y": this.state.hour.xuan._3, "c":0}, {"x": "3", "y": this.state.hour.loan._3, "c":1},
                  {"x": "4", "y": this.state.hour.xuan._4, "c":0}, {"x": "4", "y": this.state.hour.loan._4, "c":1},
                  {"x": "5", "y": this.state.hour.xuan._5, "c":0}, {"x": "5", "y": this.state.hour.loan._5, "c":1},
                  {"x": "6", "y": this.state.hour.xuan._6, "c":0}, {"x": "6", "y": this.state.hour.loan._6, "c":1},
                  {"x": "7", "y": this.state.hour.xuan._7, "c":0}, {"x": "7", "y": this.state.hour.loan._7, "c":1},
                  {"x": "8", "y": this.state.hour.xuan._8, "c":0}, {"x": "8", "y": this.state.hour.loan._8, "c":1},
                  {"x": "9", "y": this.state.hour.xuan._9, "c":0}, {"x": "9", "y": this.state.hour.loan._9, "c":1},
                  {"x": "10", "y": this.state.hour.xuan._10, "c":0}, {"x": "10", "y": this.state.hour.loan._10, "c":1},
                  {"x": "11", "y": this.state.hour.xuan._11, "c":0}, {"x": "11", "y": this.state.hour.loan._11, "c":1},
                  {"x": "12", "y": this.state.hour.xuan._12, "c":0}, {"x": "12", "y": this.state.hour.loan._12, "c":1},
                  {"x": "13", "y": this.state.hour.xuan._13, "c":0}, {"x": "13", "y": this.state.hour.loan._13, "c":1},
                  {"x": "14", "y": this.state.hour.xuan._14, "c":0}, {"x": "14", "y": this.state.hour.loan._14, "c":1},
                  {"x": "15", "y": this.state.hour.xuan._15, "c":0}, {"x": "15", "y": this.state.hour.loan._15, "c":1},
                  {"x": "16", "y": this.state.hour.xuan._16, "c":0}, {"x": "16", "y": this.state.hour.loan._16, "c":1},
                  {"x": "17", "y": this.state.hour.xuan._17, "c":0}, {"x": "17", "y": this.state.hour.loan._17, "c":1},
                  {"x": "18", "y": this.state.hour.xuan._18, "c":0}, {"x": "18", "y": this.state.hour.loan._18, "c":1},
                  {"x": "19", "y": this.state.hour.xuan._19, "c":0}, {"x": "19", "y": this.state.hour.loan._19, "c":1},
                  {"x": "20", "y": this.state.hour.xuan._20, "c":0}, {"x": "20", "y": this.state.hour.loan._20, "c":1},
                  {"x": "21", "y": this.state.hour.xuan._21, "c":0}, {"x": "21", "y": this.state.hour.loan._21, "c":1},
                  {"x": "22", "y": this.state.hour.xuan._22, "c":0}, {"x": "22", "y": this.state.hour.loan._22, "c":1},
                  {"x": "23", "y": this.state.hour.xuan._23, "c":0}, {"x": "23", "y": this.state.hour.loan._23, "c":1}
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