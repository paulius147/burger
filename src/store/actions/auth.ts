import { Action, Dispatch } from "redux";
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { ThunkDispatch } from "redux-thunk";
import { AuthInitialState } from "../reducers/auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error: Event) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: string) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, Number(expirationTime) * 1000);
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return (dispatch: ThunkDispatch<AuthInitialState, void, Action>) => {
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
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
