import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Forecast5 from './OpenWeatherAPI'
import './map.scss';

class Home extends Component{
    render(){
        return (
            <div className='rowC'>
                <div class="one"><Forecast5/></div>
                <div class="two"><MapContainer/></div>
            </div>
        )
    }
}
export default Home
