import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { UserState } from "./user.reducer";

export const selectUser = (state: AppState) => state.user;

export const nameSelector = createSelector(
  selectUser,
  (state: UserState) => state.name
);

export const isAdminSelector = createSelector(
  selectUser,
  (state: UserState) => state.isAdmin
);

export const errorMessageSelector = createSelector(
  selectUser,
  (state: UserState) => state.error
);
