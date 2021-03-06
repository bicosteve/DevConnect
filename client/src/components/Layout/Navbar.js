import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
  onlogoutClick = (event) => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/youtube'>
            Videos
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/images'>
            Images
          </Link>
        </li>
        <li className='nav-item '>
          <Link className='nav-link' to='/feed'>
            Blogs
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>

        <li className='nav-item'>
          <button
            onClick={this.onlogoutClick}
            className='nav-link btn btn-light'>
            <img
              className='rounded-circle'
              src={user.avatar}
              alt={user.username}
              style={{ width: '20px', margin: '4px' }}
              title='Connect gravatar to your mail to display image'
            />
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item '>
          <Link className='nav-link' to='/register'>
            Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-sm navbar-light bg-light mb-4'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              DevConnector
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'>
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profiles'>
                    {' '}
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
