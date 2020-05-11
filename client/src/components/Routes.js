import React from 'react';
import { Route, Router } from 'react-router-dom'
import history from './res/history'
import Forecast5 from './OpenWeatherAPI'

const Routes = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" render={(props) => <Forecast5 {...props} />} />
    </div>
  </Router>
);

export default Routes