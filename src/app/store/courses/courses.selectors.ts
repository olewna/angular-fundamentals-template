import { createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import { AppState } from "..";

export const selectCourses = (state: AppState) => state.courses;

export const isAllCoursesLoadingSelector = createSelector(
  selectCourses,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCourses,
  (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCourses,
  (state: CoursesState) => state.isSingleCourseLoading
);

// export const getCourses = createSelector(
//   selectCourses,
//   (state: CoursesState) => state.allCourses
// );

export const getAllCourses = createSelector(
  selectCourses,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCourses,
  (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
  selectCourses,
  (state: CoursesState) => state.errorMessage
);
