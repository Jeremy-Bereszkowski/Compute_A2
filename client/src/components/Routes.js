import React from 'react';
import { Route, Router } from 'react-router-dom'
import history from './res/history'
import Forecast5 from './OpenWeatherAPI'
import Home from './Home';
import MapContainer from './MapContainer'

const Routes = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/weather" render={(props) => <Forecast5 {...props} />} />
      <Route exact path="/map" render={(props) => <MapContainer {...props}/>} />
    </div>
  </Router>
);

export default Routes