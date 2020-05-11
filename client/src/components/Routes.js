import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../history';

const Routes = () => (
  <Router history={history}>
    <div>
      {/* <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} /> */}
    </div>
  </Router>
);

export default Routes