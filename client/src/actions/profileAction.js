import axios from 'axios';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER,
} from './types';

import { clearErrors } from './postAction';

//Create profile
export const createProfile = (profileData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/profile/create', profileData);
            history.push('/dashboard');
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

//get current user profile
export const getCurrentProfile = () => {
    return async (dispatch) => {
        try {
            dispatch(setProfileLoading());
            const { data } = await axios.get('/profile');
            dispatch({
                type: GET_PROFILE,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_PROFILE,
                payload: {},
            });
        }
    };
};

//get profile by handle
export const getProfileByHandle = (handle) => {
    return async (dispatch) => {
        try {
            dispatch(setProfileLoading());
            const { data } = await axios.get(`/profile/handle/${handle}`);
            dispatch({ type: GET_PROFILE, payload: data });
        } catch (error) {
            dispatch({
                type: GET_PROFILE,
                payload: null,
            });
        }
    };
};

//get all users profiles
export const getProfiles = () => {
    return async (dispatch) => {
        try {
            dispatch(setProfileLoading());
            const { data } = await axios.get('/profile/all');
            dispatch({
                type: GET_PROFILES,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_PROFILES,
                payload: {},
            });
        }
    };
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};

//clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};

//Add experience
export const addExperience = (experiencedData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/profile/add_experience', experiencedData);
            history.push('/dashboard');
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//Delete experience
export const deleteExperience = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/profile/experience/${id}`);
            dispatch({ type: GET_PROFILE, payload: data });
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

//Add education
export const addEducation = (educationData, history) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            await axios.post('/profile/add_education', educationData);
            history.push('/dashboard');
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

export const deleteEducation = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/profile/education/${id}`);
            dispatch({ type: GET_PROFILE, payload: data });
        } catch (error) {
            dispatch({ type: GET_ERRORS, payload: error.response.data });
        }
    };
};

//delete account and user profile
export const deleteAccount = () => {
    return async (dispatch) => {
        try {
            if (window.confirm('This will delete your account and profile!')) {
                await axios.delete('/profile/myProfileAndAccount');
                dispatch({ type: SET_CURRENT_USER, payload: {} });
            }
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//Deltet only the profile
export const deleteProfile = (history) => {
    return async (dispatch) => {
        try {
            if (window.confirm('This will delete your profile!')) {
                await axios.delete('/profile/my_profile');
                history.push('/create-profile');
                dispatch({ type: CLEAR_CURRENT_PROFILE });
            }
        } catch (error) {
            dispatch({
                type: GET_PROFILE,
                payload: error.response.data,
            });
        }
    };
};
