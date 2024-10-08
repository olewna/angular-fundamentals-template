import { createAction, props } from "@ngrx/store";
import { UserConstants } from "./user.constants";

export const requestUser = createAction(UserConstants.REQUEST_USER);

export const requestUserSuccess = createAction(
  UserConstants.REQUEST_USER_SUCCESS,
  props<{ name: string; isAdmin: boolean }>()
);

export const requestUserFail = createAction(
  UserConstants.REQUEST_USER_FAIL,
  props<{ error: string }>()
);
