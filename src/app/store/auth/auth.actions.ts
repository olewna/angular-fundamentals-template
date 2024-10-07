import { createAction, props } from "@ngrx/store";
import { AuthConstants } from "./auth.constants";
import { User } from "@app/shared/models/user.model";

export const login = createAction(AuthConstants.LOGIN, props<{ user: User }>());

export const loginSuccess = createAction(
  AuthConstants.LOGIN_SUCCESS,
  props<{ token: string }>()
);
export const loginFail = createAction(
  AuthConstants.LOGIN_FAIL,
  props<{ error: string }>()
);

export const logout = createAction(AuthConstants.LOGOUT);

export const register = createAction(
  AuthConstants.REGISTER,
  props<{ user: User }>()
);

export const registerSuccess = createAction(AuthConstants.REGISTER_SUCCESS);

export const registerFail = createAction(
  AuthConstants.REGISTER_FAIL,
  props<{ error: string }>()
);
