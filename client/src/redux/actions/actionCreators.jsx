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

// **************ADD COMMENT ACTION CREATORS ************ //
// FUNCTION DISPATCHTOPROPS
export const addComment = (id, comment) => ({
  type: actionTypes.ADD_COMMENT,
  payload: { id, comment }
});

// FUNCTION USED IN SAGA
export const addCommentAction = comment => ({
  type: actionTypes.ADD_COMMENT,
  payload: comment
});
// **************ADD COMMENT ACTION CREATORS ************ //

export const deletePost = (id, posts) => ({
  type: actionTypes.DELETE_POST,
  payload: { id, posts }
});

export const updatePost = (id, post) => ({
  type: actionTypes.UPDATE_POST,
  payload: { id, post }
});
