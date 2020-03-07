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
import { clearComments } from "../actions/actionCreators";

async function fetchData(id) {
  const { data } = await axios.get(`${apiEndpoint}/${id ? id : ""}`);
  return data;
}

// GET REQUEST WORKER
export function* tryGetRequest(action) {
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
    yield put(fetchError(error.message));
  }
}

// GET REQUEST WATCHER
export function* onGetRequest() {
  yield takeLatest(actionTypes.GET_REQUEST, tryGetRequest);
}

async function fetchComments(id) {
  const { data } = await axios.get(`${apiEndpoint}/${id}/comments`);
  return data;
}

// GET COMMENTS WORKER
export function* tryGetComments(action) {
  try {
    const data = yield call(fetchComments, action.payload);
    yield put(clearComments());
    yield put(fetchRequest());

    yield put(fetchCommentsAction(data));
  } catch (error) {
    console.log("Error: ", error.message);
    yield put(clearComments());
    yield put(fetchError(error.message));
  }
}

// GET COMMENTS WATCHER
export function* onGetComments() {
  yield takeLatest(actionTypes.GET_COMMENTS, tryGetComments);
}

const fetchAddPost = async post => {
  const { data } = await axios.post(`${apiEndpoint}`, post);
  return data;
};

// ADD POSTS WORKER
export function* tryAddPost(action) {
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
export function* onAddPost() {
  yield takeLatest(actionTypes.ADD_POST, tryAddPost);
}

export default function* appSagas() {
  yield all([call(onGetRequest), call(onGetComments), call(onAddPost)]);
}
