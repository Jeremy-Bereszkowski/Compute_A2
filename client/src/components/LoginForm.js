import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function LoginForm(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={props.login} className='form_css'>
                    <div className='form-item'>
                        <label htmlFor='username'>E-Mail</label>
                        <input className='input' id='username' type='text'/>
                    </div>
                    <div className='form-item'>
                        <label htmlFor='password'>Password</label>
                        <input className='input' id='password' type='password'/>
                    </div>
                    <div className='loginButton'>
                        <Button type='submit' variant='primary'>Login</Button>
                    </div>
                    {props.err ? 'Incorrect E-Mail or Password' : null}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
};
  
export default LoginForm