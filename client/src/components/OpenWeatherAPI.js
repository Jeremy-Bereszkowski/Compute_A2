import React, { Component, useState } from 'react'
import moment from 'moment'
import Auth from './res/auth';
import { fetchForecastByCityName } from '../services/openweathermap'
import ForecastView from '../views/ForecastView'

const auth = new Auth();

class Forecast5 extends Component {
	constructor(props){
	super(props)
	this.state = {
		loading: false,
		forecast: [],
		cityName: 'Melbourne,au'
	}
	this.getForecastData = this.getForecastData.bind(this);
	this.onTodoChange = this.onTodoChange.bind(this);



	cityName = 'melbourne,au'

	componentWillMount() {	
		
		//console.log(this.apiCall());
		
		this.getForecastData();
	}
	

	async getForecastData() {

		let cityName = ''

		if (auth.isAuthenticated() === true) {
			await fetch('https://us-central1-compute-a2-2020.cloudfunctions.net/auth/favCity/' + localStorage.getItem('id_token'))
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then((res) => {
				console.log(res)
				cityName= res[0].fav_city
				
			})
		} else {
			cityName= 'Brisbane,AU'
		}
		

		this.cityName = cityName
		
		this.setState({ loading: true });
		const result = await fetchForecastByCityName(this.state.cityName);

		this.setState({
			loading: false,
			forecast: result.list.map(item => ({
				date: moment(item.dt * 1000),
				temp: item.main.temp,
				humidity: item.main.humidity,
				weather: item.weather[0],
			}))
		});
	}

	onTodoChange(e){
		console.log(e)
		this.setState({
			cityName: e.target.value
		});
		console.log(this.cityName)
    }

	render() {
		return (
			<div className="input-container">
			<h1 className="input-header" id="homeHeader">Enter a Location and Country and Press Enter</h1>
			<div className="input-controls">
				<input type="text" placeholder="Melbourne, au" className="form-control" onKeyPress={(e) => {this.onTodoChange(e)}}/>
				{console.log(this.state.cityName)}

			</div>
			<ForecastView
				cityName={this.state.cityName}
				forecast={this.state.forecast}
				loading={this.state.loading}
				onPressRefresh={() => this.getForecastData()}
			/>
					</div>

		);
	}
}

export default Forecast5;
