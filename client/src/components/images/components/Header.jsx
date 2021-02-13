import React from 'react';
import { NavLink } from 'react-router-dom';

const ImageHeader = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-sm navbar-light bg-light mb-4'>
        <div>
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
                <NavLink className='nav-link' to='/image-home' exact>
                  {' '}
                  Images
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/all-images' exact>
                  {' '}
                  All Images
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ImageHeader;
