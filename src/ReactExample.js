

import axios from "axios";
import React, { Component } from "react";

export default class Weather extends Component {
constructor(){
    super();
    this.state = {Weather: "not yet gotten"
    };
}

componentDidMount = () => {
    axios.get("/getWeather").then(response => {
        this.setState({
            Weather: response.data.temp
        });
        
    });
};
render(){
    return (
        <div>
        <button>get Weather in ashdod</button>
        <h1>the weather in ashdod is: {this.state.Weather} </h1>
        </div>
    );
}

}