import React, { Component } from 'react';
import axios from 'axios';
import { createClassFromSpec } from 'react-vega'
import Shimmer from '../shimmer' 

export default class Month extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:5000',
            month : undefined
        }
    }

    componentDidMount() {
        axios.get(this.state.url+`/message/month`,{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            const result = res.data;
            this.setState(prevState => ({
                month: result
            }));
        }).catch(err => {
            console.log('err', err)
        })
    }

    render() {
        console.log(this.state.month)
        return (
          <div className="circle">
                {this.createView()}
          </div>
        );
    }

    createView() {
        if (!this.state.month) return <Shimmer />
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
                  {"x": "Jan", "y": this.state.month.xuan.jan, "c":0}, {"x": "Jan", "y": this.state.month.loan.jan, "c":1},
                  {"x": "Feb", "y": this.state.month.xuan.feb, "c":0}, {"x": "Feb", "y": this.state.month.loan.feb, "c":1},
                  {"x": "Mar", "y": this.state.month.xuan.mar, "c":0}, {"x": "Mar", "y": this.state.month.loan.mar, "c":1},
                  {"x": "Apr", "y": this.state.month.xuan.apr, "c":0}, {"x": "Apr", "y": this.state.month.loan.apr, "c":1},
                  {"x": "May", "y": this.state.month.xuan.may, "c":0}, {"x": "May", "y": this.state.month.loan.may, "c":1},
                  {"x": "Jun", "y": this.state.month.xuan.jun, "c":0}, {"x": "Jun", "y": this.state.month.loan.jun, "c":1},
                  {"x": "Jul", "y": this.state.month.xuan.jul, "c":0}, {"x": "Jul", "y": this.state.month.loan.jul, "c":1},
                  {"x": "Aug", "y": this.state.month.xuan.aug, "c":0}, {"x": "Aug", "y": this.state.month.loan.aug, "c":1},
                  {"x": "Sep", "y": this.state.month.xuan.sep, "c":0}, {"x": "Sep", "y": this.state.month.loan.sep, "c":1},
                  {"x": "Oct", "y": this.state.month.xuan.oct, "c":0}, {"x": "Oct", "y": this.state.month.loan.oct, "c":1},
                  {"x": "Nov", "y": this.state.month.xuan.nov, "c":0}, {"x": "Nov", "y": this.state.month.loan.nov, "c":1},
                  {"x": "Dec", "y": this.state.month.xuan.dec, "c":0}, {"x": "Dec", "y": this.state.month.loan.dec, "c":1}
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