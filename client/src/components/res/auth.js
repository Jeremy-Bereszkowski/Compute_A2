import history from './history';

export default class Auth {

  handleAuthentication = (response) => {
    this.setSession(response);
    history.replace('/');
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((64000) + new Date().getTime());
    localStorage.setItem('access_token', body.clearance);
    localStorage.setItem('id_token', body.user_id);
    localStorage.setItem('user_fname', body.fname.toUpperCase());
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route

    history.replace('/');
    window.location.reload(false);
  }  

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_fname');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
    
  }

  getUserName = () => {
    return localStorage.getItem('user_fname')
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    if (new Date().getTime() < expiresAt) {
      return true
    } else {
      this.logout()
      return false
    }
  }
}