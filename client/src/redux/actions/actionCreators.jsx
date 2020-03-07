import { actionTypes } from "./";

export const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
});

export const fetchSuccess = posts => ({
  type: actionTypes.FETCH_SUCCESS,
  payload: posts
});

export const fetchError = error => ({
  type: actionTypes.FETCH_ERROR,
  payload: error
});

export const getRequest = id => ({
  type: actionTypes.GET_REQUEST,
  payload: id
});

export const getComments = id => ({
  type: actionTypes.GET_COMMENTS,
  payload: id
});

export const fetchComments = comments => ({
  type: actionTypes.FETCH_COMMENTS,
  payload: comments
});

export const clearComments = () => ({
  type: actionTypes.CLEAR_COMMENTS
});

export const addPost = post => ({
  type: actionTypes.ADD_POST,
  payload: post
});
