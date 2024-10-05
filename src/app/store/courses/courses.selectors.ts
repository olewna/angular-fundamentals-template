import { createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import { AppState } from "../app.state";

export const selectCourses = (state: AppState) => state.courses;

export const selectAllCourses = createSelector(
  selectCourses,
  (state: CoursesState) => state.courses
);
