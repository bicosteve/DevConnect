import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className='bg-light mt-5 p-4 text-center'>
        @ {new Date().getFullYear()} Dev-Connect
      </footer>
    </div>
  );
};

export default Footer;
