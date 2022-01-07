import * as actionTypes from "../actions/actionTypes";

export interface AuthActions {
  type: string;
  idToken: string;
  userId: string;
  error: Error;
}

export interface AuthInitialState {
  token: string | null;
  userId: string | null;
  error: Error | null;
  loading: boolean;
}

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
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
    default:
      return state;
  }
};

export default reducer;
