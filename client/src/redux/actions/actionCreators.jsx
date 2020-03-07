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
