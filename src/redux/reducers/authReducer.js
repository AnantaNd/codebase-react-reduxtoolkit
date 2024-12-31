import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../types/authTypes";

const initialState = {
  user: null,
  token: null,
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, status: "loading", error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        user: action.payload.data,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return { ...state, status: "failed", error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
