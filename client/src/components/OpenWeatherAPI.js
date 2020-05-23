import React, { Component, useState } from 'react'
import moment from 'moment'
import Auth from './res/auth';
import { fetchForecastByCityName } from '../services/openweathermap'
import ForecastView from '../views/ForecastView'

const auth = new Auth();

class Forecast5 extends Component {

	apiCall() {
		
	}
	
	
	state = {
		loading: false,
		forecast: []
	}

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
		const result = await fetchForecastByCityName(cityName);
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

	render() {
		return (
			<ForecastView
				cityName={this.cityName}
				forecast={this.state.forecast}
				loading={this.state.loading}
				onPressRefresh={() => this.getForecastData()}
			/>
		);
	}
}

export default Forecast5;
