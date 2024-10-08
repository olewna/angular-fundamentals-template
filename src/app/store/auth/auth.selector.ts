import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { AuthState } from "./auth.reducer";

export const selectAuth = (state: AppState) => state.auth;

export const isAuthorizedSelector = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthorized
);

export const errorMessageSelector = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage
);
