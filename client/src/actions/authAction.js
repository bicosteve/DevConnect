import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import { clearErrors } from './postAction';

///Register New User
export const registerUser = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/auth/register', userData);
            history.push('/login');
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

///Sent reset link
export const resetPassword = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/auth/resetPassword', userData);
            history.push('/login');
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

///Update new password
export const updatePassword = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/auth/newPassword', userData);
            history.push('/login');
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

///tylermaginus.com///

///Loging Get user token
export const loginUser = (userData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            const res = await axios.post('/auth/login', userData);
            ///extract token from response
            const { token } = res.data;
            ///set token to local storage
            localStorage.setItem('jwtToken', token);
            ///set token to authheader
            setAuthToken(token);
            ///Decode the token to get user data
            const decoded = jwt_decode(token);
            ///set current user
            dispatch(setCurrentUser(decoded));
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

///Log user out
export const logoutUser = () => {
    return async (dispatch) => {
        //remove token from local storage
        localStorage.removeItem('jwtToken');
        //remove auth header for future request
        setAuthToken(false);
        ///set current user to {} which set authenticated to false
        dispatch(setCurrentUser({}));
    };
};

///
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};
