import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Forecast5 from './OpenWeatherAPI'
import './map.scss';

class Home extends Component{
    render(){
        return (
            <div className='rowC'>
                <Forecast5/>
                <MapContainer/>
            </div>
        )
    }
}
export default Home
