import axios from 'axios';

import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
} from './types';

//add a post
export const addPost = (postData) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            const { data } = await axios.post('/post/create', postData);
            dispatch({
                type: ADD_POST,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//get all posts
export const getPosts = () => {
    return async (dispatch) => {
        try {
            dispatch(setPostLoading());
            const { data } = await axios.get('/post/all_posts');
            dispatch({
                type: GET_POSTS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_POSTS,
                payload: null,
            });
        }
    };
};

//Delete post
//`/profile/education/${id}`
export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/post/delete/${id}`);
            dispatch({
                type: DELETE_POST,
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//Add like
export const addLike = (id) => {
    return async (dispatch) => {
        try {
            await axios.post(`/post/like/${id}`);
            dispatch(getPosts());
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//Add like
export const removeLike = (id) => {
    return async (dispatch) => {
        try {
            await axios.post(`/post/unlike/${id}`);
            dispatch(getPosts());
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//get a post
export const getPost = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setPostLoading());
            const { data } = await axios.get(`/post/one_post/${id}`);
            dispatch({
                type: GET_POST,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_POST,
                payload: null,
            });
        }
    };
};

//add comment
export const addComment = (postId, commentData) => {
    return async (dispatch) => {
        try {
            dispatch(clearErrors());
            const { data } = await axios.post(
                `/post/comment/${postId}`,
                commentData
            );
            dispatch({
                type: GET_POST,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//delete comment
export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(
                `/post/comment/${postId}/${commentId}`
            );
            dispatch({
                type: GET_POST,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    };
};

//set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING,
    };
};

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
