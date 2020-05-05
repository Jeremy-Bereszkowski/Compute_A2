import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Footer from './components/Footer';



function App(props) {

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const handleShow = () => setShow(true);

  function closeForm() {
    setShow(false);
    setErr(false);
  }

  function login(event) {
    event.preventDefault();
    const {username, password} = event.target.elements;

    fetch('https://us-central1-compute-a2-2020.cloudfunctions.net/helloWorld', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        uname: username.value,
        pword: password.value
      })
    })
    .then((response) => {
      if (response.status === 200) {
        props.auth.handleAuthentication(response);
        closeForm();
      } else {
        setErr(true);
      }
    })
  }

  const handleLoginLogout = () => {
    if (props.auth.isAuthenticated == true)
    {
      this.props.auth.logout();
    }
    else {
      handleShow();
    }
  }

  function TestBlock() {
    if (props.auth.isAuthenticated == true)
    {
      return (
        <div>
          Logged in
        </div>
      )
    }
    else {
      return (
        <div>
          Logged out
        </div>
      )
    }
  }

  const headerItems = [
    {title: 'Acct', onClick: handleLoginLogout},
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

      {<TestBlock />}
      <Modal show={show} onHide={closeForm}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={login} class='form_css'>
              <div class='form-item'>
                <label htmlFor='username'>E-Mail</label>
                <input class='input' id='username' type='text'/>
              </div>
              <div class='form-item'>
                <label htmlFor='password'>Password</label>
                <input class='input' id='password' type='password'/>
              </div>
              <div class='loginButton'>
                <Button type='submit' variant='primary'>Login</Button>
              </div>
              {err ? 'Incorrect E-Mail or Password' : null}
            </form>
          </Modal.Body>
        </Modal>
    </div>
  );
}

export default App; 