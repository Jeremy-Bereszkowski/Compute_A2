import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Forecast5 from './OpenWeatherAPI'
import './map.scss';

class Home extends Component{
    render(){
        return (
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="flex-md-row mb-4 shadow-sm h-md-250">
                        <Forecast5/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="flex-md-row mb-4 shadow-sm h-md-250">
                        <MapContainer/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home
