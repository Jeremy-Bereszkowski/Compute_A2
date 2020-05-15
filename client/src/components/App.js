import React, { useState } from 'react'
import Auth from './res/auth';
import Login from './LoginForm'
import Header from './Header'
import Router from './Routes'
import Footer from './Footer'
import '../css/index.css'

const auth = new Auth();

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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + 'https://us-central1-compute-a2-2020.cloudfunctions.net/helloWorld', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
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
    if (auth.isAuthenticated === true)
    {
      this.props.auth.logout();
    }
    else {
      handleShow();
    }
  }

  function TestBlock() {
    if (auth.isAuthenticated === true)
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
    <div className="App">
      <Login show={show} closeForm={closeForm} login={login} err={err}/>
      <Header items={headerItems}/>
      <Router />
      <Footer />
      {<TestBlock />}
    </div>
  );
}

export default App; 