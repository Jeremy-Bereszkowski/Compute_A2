import React, { useState } from 'react'
import Auth from './res/auth'
import Login from './LoginForm'

const auth = new Auth();

function Header(props) {
    const [show, setShow] = useState(false);
    const [err, setErr] = useState(false);
    const userName = auth.getUserName();
  
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
      })
      .catch(err => console.log(err));
    }
  
    const handleLoginLogout = () => {
      if (auth.isAuthenticated() === true) {
        auth.logout();
        window.location.reload(false);
      } else {
        handleShow();
      }
    }
  
    const headerItems = [
      {title: auth.isAuthenticated() ? 'Logout' : 'Login', onClick: handleLoginLogout},
      {title: userName},
    ];

    return (
        <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
            <span class="navbar-brand col-sm-3 col md 2 mr-0">{process.env.REACT_APP_NAME}</span>
            <ul class="navbar-nav px-3">
                {headerItems.map((item, index) => (
                    <li class="nav-item text-nowrap" id={index}>
                        <a href={item.link} class="nav-link" onClick={item.onClick}>
                            {item.title}
                        </a>
                    </li>
                ))}
                
            </ul>

            <Login show={show} closeForm={closeForm} login={login} err={err}/>
        </nav>
    )
}

export default Header
