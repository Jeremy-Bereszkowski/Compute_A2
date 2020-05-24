import React, { Component } from 'react'
import moment from 'moment'
import { fetchForecastByCityName } from '../services/openweathermap'
import ForecastView from '../views/ForecastView'

class Forecast5 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			forecast: [],
			cityName: 'Melbourne, AU'
		}
		this.getForecastData = this.getForecastData.bind(this);
		this.onTodoChange = this.onTodoChange.bind(this);
	}

	componentWillMount() {	
		this.getForecastData();
	}

	async getForecastData(city) {
		this.setState({ loading: true });

		const cityName = !city ? this.state.cityName : city

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

	onTodoChange = (e) => {
		e.preventDefault()
		const city = e.target.city.value
		this.setState({
			...this.state,
			cityName: city
		});
		this.getForecastData(city);
    }

	render() {
		return (
			<div className="input-container">
			<h1 className="input-header" id="homeHeader">Enter a Location</h1>
			<div >
			<form onSubmit={(e) => {this.onTodoChange(e)}}>
				<div class="row">
				
					<div class="col-sm">
					<input id='city' type="text" placeholder="Format: City,Country" className="form-control" />
					</div>
					<div class="col-sm">
						<button type="submit" class="btn btn-secondary"
							disabled={this.state.loading}
						>
							Refresh
						</button>
					</div>
				</div>
					</form>
			</div>
				<ForecastView
					cityName={this.state.cityName}
					forecast={this.state.forecast}
					loading={this.state.loading}
				/>
			</div>

		);
	}
}

export default Forecast5;
