import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";
import { apiEndpoint } from "../../services/authService";
import {
  actionTypes,
  fetchRequest,
  fetchSuccess,
  fetchComments as fetchCommentsAction,
  fetchError
} from "../actions";
import { clearComments, addCommentAction } from "../actions/actionCreators";

async function fetchData(id) {
  const { data } = await axios.get(`${apiEndpoint}/${id ? id : ""}`);
  return data;
}

// GET REQUEST WORKER
function* tryGetRequest(action) {
  try {
    yield put(fetchRequest());
    const data = yield call(fetchData, action.payload);
    const id = action.payload;

    let dataArray;

    if (id) {
      dataArray = data;
    } else {
      dataArray = [...data];
    }

    yield put(fetchSuccess(dataArray));
  } catch (error) {
    yield put(fetchError(error.response.data.message));
  }
}

// GET REQUEST WATCHER
function* onGetRequest() {
  yield takeLatest(actionTypes.GET_REQUEST, tryGetRequest);
}

async function fetchComments(id) {
  const data = await axios.get(`${apiEndpoint}/${id}/comments`);
  return data;
}

// GET COMMENTS WORKER
function* tryGetComments(action) {
  try {
    const { data } = yield call(fetchComments, action.payload);
    yield put(clearComments());
    yield put(fetchRequest());

    yield put(fetchCommentsAction(data));
  } catch (error) {
    console.log("Error: ", error.response.data.message);
    yield put(clearComments());
    yield put(fetchError(error.response.data.message));
  }
}

// GET COMMENTS WATCHER
function* onGetComments() {
  yield takeLatest(actionTypes.GET_COMMENTS, tryGetComments);
}

const fetchAddPost = async post => {
  const { data } = await axios.post(`${apiEndpoint}`, post);
  return data;
};

// ADD POSTS WORKER
function* tryAddPost(action) {
  try {
    yield put(fetchRequest());

    const data = yield call(fetchAddPost, action.payload);

    yield put(fetchSuccess(data));
  } catch (error) {
    console.log("Error: ", error.message);
    yield put(fetchError(error.message));
  }
}

// ADD POSTS WATCHER
function* onAddPost() {
  yield takeLatest(actionTypes.ADD_POST, tryAddPost);
}

// ADD COMMENT FETCH CALL
const fetchAddComment = async (id, comment) => {
  const data = await axios.post(`${apiEndpoint}/${id}/comments`, comment);
  return data;
};

// ADD COMMENT WORKER
function* tryAddComment(action) {
  try {
    yield put(fetchRequest());
    const { data } = yield call(
      fetchAddComment,
      action.payload.id,
      action.payload.comment
    );

    yield put(addCommentAction(data));
  } catch (error) {
    console.log("Error: ", error.response.data.message);
    yield put(fetchError(error.response.data.message));
  }
}

// ADD COMMENT WATCHER
function* onAddComment() {
  yield takeLatest(actionTypes.ADD_COMMENT, tryAddComment);
}

const fetchDelete = async id => {
  return await axios.delete(`${apiEndpoint}/${id}`);
};

function* tryDeletePost(action) {
  yield put(fetchRequest());

  const postsCopy = [...action.payload.posts];
  const postsUpdated = [...action.payload.posts].filter(
    post => post.id !== action.payload.id
  );
  yield put(fetchSuccess(postsUpdated));

  try {
    yield call(fetchDelete, action.payload.id);
  } catch (error) {
    console.log("Error: ", error.response.data.message);
    yield put(fetchSuccess(postsCopy));
    yield put(fetchError(error.response.data.message));
  }
}

function* onDeletePost() {
  yield takeLatest(actionTypes.DELETE_POST, tryDeletePost);
}

const fetchUpdatePost = async (id, post) => {
  const { data } = await axios.put(`${apiEndpoint}/${id}`, post);
  return data;
};

function* tryUpdatePost(action) {
  yield put(fetchRequest());
  try {
    yield put(fetchRequest());
    const data = yield call(
      fetchUpdatePost,
      action.payload.id,
      action.payload.post
    );

    yield put(fetchSuccess(data));
  } catch (error) {
    console.log("Error: ", error.response);
    yield put(fetchError(error.response));
  }
}

function* onUpdatePost() {
  yield takeLatest(actionTypes.UPDATE_POST, tryUpdatePost);
}

export default function* appSagas() {
  yield all([
    call(onGetRequest),
    call(onGetComments),
    call(onAddPost),
    call(onAddComment),
    call(onDeletePost),
    call(onUpdatePost)
  ]);
}
