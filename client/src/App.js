import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer';

function App(props) {

  const headerItems = [
    {title: 'Logout', onClick: props.logoutHandler},
  ];

  return (
    <div class="App">
      <Router>
        <Header items={headerItems}/>
        <main>
          <Route exact path="/">
            {/* <Dashboard/> */}
          </Route>
          {/* <Route path="/project" component={Project}/> */}
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App; 