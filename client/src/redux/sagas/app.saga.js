import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";
import { apiEndpoint } from "../../services/authService";
import {
  actionTypes,
  fetchRequest,
  fetchSuccess,
  fetchError
} from "../actions";

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

export default function* appSagas() {
  yield all([call(onGetRequest)]);
}
