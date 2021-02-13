import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Images from './components/Images';
import Header from './components/Header';

const ImageApp = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
      </div>
      <div>
        <Switch>
          <Route exact path='/images' component={Images} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default ImageApp;
