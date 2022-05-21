// layout.js
import React from 'react';

// Request helpers
import { safeCredentials, handleErrors } from './utils/fetchHelper';

// styles
import './layout.scss';


const Layout = (props) => {

  function logout(event) {
    event.preventDefault();
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE'
    }))
    .then(handleErrors)
    .then(response => {
      if (response.success) {
        console.log('You have been logged out.');
      } else {
        console.log(response);
      }
    })
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto w-100">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className='right'>

                { // Buttons for guest user 
                  props.isLoggedIn ||
                  <ul>
                    <li className='nav-item'>
                      <a href='/login?redirect_url=/' className='btn login-btn'>Log In</a>
                    </li>
                  </ul>
                
                }

                { // Buttons for logged in user
                props.isLoggedIn && 
                <ul>
                  <li className='nav-item'>
                    <a href='#' className='btn menu-item bookings-btn'>My Stays</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#' className='btn menu-item properties-btn'>My Properties</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#' className='btn logout-btn' onClick={logout}>Log Out</a>
                  </li>
                </ul>}

              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;