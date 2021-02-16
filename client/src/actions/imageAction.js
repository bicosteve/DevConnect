import axios from 'axios';
import { clearErrors } from './postAction';

import { GET_IMAGES, POST_IMAGE, GET_ERRORS } from './types';

export const postImage = (imageData, history) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      const { data } = await axios.post('image/create', imageData);
      history.push('/all-images');
      dispatch({
        type: POST_IMAGE,
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

export const getImages = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('image/all_images');
      dispatch({
        type: GET_IMAGES,
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
