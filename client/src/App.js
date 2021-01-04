import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import NewPassword from './components/Auth/NewPassword';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/Notfound';
import Post from './components/post/Post';

//check for token
if (localStorage.jwtToken) {
    //set auth token header aoth
    setAuthToken(localStorage.jwtToken);
    //decode token and get user info and expiry
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and is authenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //logout User
        store.dispatch(logoutUser());

        //clear current profile
        store.dispatch(clearCurrentProfile());

        //redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='App'>
                        <Navbar />
                        <Route exact={true} path='/' component={Landing} />
                        <div className='container'>
                            <Route exact path='/profiles' component={Profiles} />
                            <Route
                                exact
                                path='/profile/:handle'
                                component={Profile}
                            />
                            <Route exact path='/register' component={Register} />
                            <Route
                                exact
                                path='/resetPassword'
                                component={ResetPassword}
                            />
                            <Route
                                exact
                                path='/reset/:token'
                                component={NewPassword}
                            />
                            <Route exact path='/login' component={Login} />
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/create-profile'
                                    component={CreateProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/edit-profile'
                                    component={EditProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/add-experience'
                                    component={AddExperience}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/add-education'
                                    component={AddEducation}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/feed'
                                    component={Posts}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path='/post/:id'
                                    component={Post}
                                />
                            </Switch>
                            <Route exact path='/not-found' component={NotFound} />
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
