import React, { Component } from 'react'
import moment from 'moment'
import { fetchForecastByCityName } from '../services/openweathermap'
import ForecastView from '../views/ForecastView'
import Auth from './res/auth'

const auth = new Auth();

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

	componentDidMount() {	
		this.getForecastData();
	}

	async getForecastData(city) {
		this.setState({ loading: true });

		const cityName = city ? city : auth.isAuthenticated() ? auth.getFavCity() : this.state.cityName

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

	showFav = (e) => {
		e.preventDefault()
		const city = auth.getFavCity()
		this.setState({
			...this.state,
			cityName: city
		});
		this.getForecastData(city);
	}

	showFavorite = (
		<div className="col-sm">
			<button type="submit" className="btn btn-primary" onClick={this.showFav}>
				Show Favorite
			</button>
		</div>
	)

	render() {
		return (
			<div className="input-container">
				<h1 className="input-header" id="homeHeader">Enter a Location</h1>
				<form onSubmit={this.onTodoChange}>
					<div className="row">
						<div className="col-sm">
							<input id='city' type="text" placeholder="Format: City,Country" className="form-control" />
						</div>
						<div className="col-sm">
							<button type="submit" className="btn btn-secondary">
								Refresh
							</button>
						</div>
						{auth.isAuthenticated() ? this.showFavorite : ''}
					</div>
				</form>
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
