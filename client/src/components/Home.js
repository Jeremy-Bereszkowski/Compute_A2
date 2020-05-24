import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Forecast5 from './OpenWeatherAPI'
import './map.scss';

class Home extends Component{
    render(){
        return (
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="flex-md-row mb-4 h-md-250">
                        <Forecast5/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="flex-md-row mb-4 h-md-250">
                        <MapContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home