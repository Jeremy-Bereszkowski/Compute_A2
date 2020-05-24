import React from 'react';
import Loading from './res/Loading';
import Item from './res/Forecast1';
import './res/index.scss';

const ForecastView = props => (
	<div className="ForecastView">
		<div className="city-name">
			<span>{props.cityName}</span>
		</div>
		<div className="reload">
			<button
				onClick={props.onPressRefresh}
				disabled={props.loading}
			>
				Refresh
			</button>
		</div>
		{props.loading ? (
			<Loading />
		) : (
			<div className="forecast-day">
				{props.forecast.map((item, index) => (
					<Item
						key={index}
						{...item}
					/>
				))}
			</div>
		)}
	</div>
);

export default ForecastView;
