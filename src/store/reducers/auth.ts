import * as actionTypes from "../actions/actionTypes";

export interface AuthActions {
  type: string;
  idToken: string;
  userId: string;
  error: Error;
  path: string;
}

export interface AuthInitialState {
  token: string | null;
  userId: string | null;
  error: Error | null;
  loading: boolean;
  authRedirectPath: string;
}

const initialState: AuthInitialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const reducer = (
  state: AuthInitialState = initialState,
  action: AuthActions
) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        token: action.idToken,
        userId: action.userId,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
