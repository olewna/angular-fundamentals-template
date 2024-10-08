import { User } from "@app/shared/models/user.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  token: null,
  isAuthorized: false,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    isAuthorized: true,
    token,
    error: null,
  })),
  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    isAuthorized: false,
    token: null,
    errorMessage: error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    error: null,
    isAuthorized: false,
    token: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.registerFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const reducer = (state: AuthState, action: Action): AuthState =>
  authReducer(state, action);
