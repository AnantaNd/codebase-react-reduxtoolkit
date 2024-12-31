import apiClient from "../../utils/axiosConfig";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../types/authTypes";

// Action creator untuk login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await apiClient.post("/auth/login", credentials);

    // Simpan data user dan token ke localStorage
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.data.access_token.token);

    // Dispatch success action
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    return response.data; // Kembalikan data untuk Promise
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });

    throw error; // Lempar error agar bisa ditangkap
  }
};
