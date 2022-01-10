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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        ).toString();
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path: string) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch: ThunkDispatch<AuthInitialState, void, Action>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate")!);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId!));
        const seconds =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(seconds.toString()));
      }
    }
  };
};
