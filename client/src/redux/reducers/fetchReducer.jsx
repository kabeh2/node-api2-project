import { actionTypes } from "../actions";

const initialState = {
  loading: false,
  posts: [],
  comments: [],
  error: ""
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case actionTypes.FETCH_COMMENTS:
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      };
    default:
      return state;
  }
};

export default fetchReducer;
