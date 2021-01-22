import React from 'react';

const Spinner = ({ message }) => {
  return (
    <div className='spinner-item'>
      <div className='spinner'>
        <div className=''>
          <div className='ui active inverted dimmer'>
            <div className='ui large text loader'>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  message: 'Please make a search...',
};

export default Spinner;
