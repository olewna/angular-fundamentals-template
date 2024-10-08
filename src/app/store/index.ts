import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";
import { userReducer, UserState } from "./user/user.reducer";
import { UserEffects } from "./user/user.effects";

export interface AppState {
  courses: CoursesState;
  auth: AuthState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  courses: coursesReducer,
  auth: authReducer,
  user: userReducer,
};

export const effects = [CoursesEffects, AuthEffects, UserEffects];
