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
  const [test, setTest] = useState('');

  const handleShow = () => setShow(true);

  function closeForm() {
    setShow(false);
    setErr(false);
  }

  function login(event) {
    event.preventDefault();
    const {username, password} = event.target.elements;
    fetch('https://us-central1-compute-a2-2020.cloudfunctions.net/auth/login', {
      method: 'post',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
      },
      body: JSON.stringify({
        uname: username.value,
        pword: password.value
      })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        setErr(true);
      }
    })
    .then(res => {
      auth.handleAuthentication(res);
      closeForm();
      setTest('Logged in');
    })
    .catch(err => console.log(err));
  }

  const handleLoginLogout = () => {
    if (auth.isAuthenticated === true) {
      this.props.auth.logout();
      setTest('Logged out');
    } else {
      handleShow();
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
      {test}
    </div>
  );
}

export default App; 