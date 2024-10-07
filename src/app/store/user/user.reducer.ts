import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export interface UserState {
  name: string | null;
  isAdmin: boolean;
  error: string | null;
}

export const initialState: UserState = {
  name: null,
  isAdmin: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.requestUser, (state) => ({
    ...state,
    error: null,
  })),
  on(UserActions.requestUserSuccess, (state, { name, isAdmin }) => ({
    ...state,
    name,
    isAdmin,
  })),
  on(UserActions.requestUserFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const reducer = (state: UserState, action: Action): UserState =>
  userReducer(state, action);
