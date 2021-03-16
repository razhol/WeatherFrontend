import axios from "axios";
import React, { Component } from "react";



export default class Weather extends Component {
    constructor() {
        super();
        this.state = {
            Weather: '',
            HistoryWeather: [],
            cities: []
        };
        this.cityInputRef = React.createRef();
    }

    handlecityChange = event => {
        this.setState({ city: event.target.value });
    }


    HistoryAndCurrentCity = async () => {
        debugger;
        await this.WetherInCurrentCity();
        await this.CitiesList();
        await this.TempFromApi();
    }


    WetherInCurrentCity = async () => {
        const cityValue = this.cityInputRef.current.value;
        await axios.post("/WetherInCurrentCity",{cityValue}).then((response) => {
            this.setState({ Weather: response.data });
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    CitiesList = async () => {
        const cityValue = this.cityInputRef.current.value;
        await axios.post("/CitiesListDB", { cityValue }).then(response => {
            var ans_cities = response.data.listTitle;
            this.setState({
                cities: ans_cities
            });

        });
    };


    TempFromApi = async () => {
        let cities_temp = this.state.cities;
        await axios.post("/TempFromApi",{ cities_temp}).then(response => {
            this.setState({
                HistoryWeather: response.data
            });

        });
    };

    deleteItem = async (event) => {
        console.log(event);
        let city_temp = event.target.value;
        let city_name2;
        city_name2 = city_temp.replaceAll(/[+\-0-9.]+/g, "");
        while (city_name2.charAt(city_name2.length - 1) === " ") {
            city_name2 = city_name2.substr(0, city_name2.length - 1);
        }
        await axios.delete("/deletefromDB", {
            data: {
              source: city_name2
            }
          }).then(response => {
            let ans_cities = response.data.listTitle;
            if (ans_cities.length === 0) {
                this.setState({
                    HistoryWeather: ans_cities
                });
            }
            this.setState({
                cities: ans_cities
            });

        });

    };


    delateAndUpdate = async (event) => {
        await this.deleteItem(event);
        await this.TempFromApi();
    }




    render() {
        return (


            <div>

                <h1 id="SerachCity">Weather Applictation</h1>

                <div class="search">
                    <input ref={this.cityInputRef} type="text" placeholder="Search the weather by city"></input>
                    <div class="button-src">
                        <button id="button" onClick={this.HistoryAndCurrentCity}>  Search</button>
                    </div>
                </div>





                <div id="weather_state">

                    {this.state.Weather}
                </div>


                <h3 id="history">Weather History</h3>


                {this.state.HistoryWeather.map((city_W) =>



                    <ul>

                        <li>{city_W} <input type="checkbox" name="checkbox" onChange={this.delateAndUpdate} value={city_W} ></input></li>
                    </ul>

                )}
            </div>
        );

    }

}
