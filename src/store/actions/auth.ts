import { Dispatch } from "redux";
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

interface AuthData {
  [key: string]: string;
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData: AuthData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error: Event) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbt8mrQTGyWyAlQyS5MvxgF0bm46XZpMY";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbt8mrQTGyWyAlQyS5MvxgF0bm46XZpMY";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
