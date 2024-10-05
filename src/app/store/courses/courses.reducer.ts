import { Course } from "@app/shared/models/course.model";
import { Action, createReducer, on } from "@ngrx/store";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestDeleteCourseSuccess,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesFail,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
    isSearchState: false,
  })),
  on(requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    isAllCoursesLoading: false,
    courses: [...courses],
  })),
  on(requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(requestSingleCourse, (state, { id }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
    isSearchState: false,
  })),
  on(requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    course: course,
  })),
  on(requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestFilteredCourses, (state, { title }) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: null,
  })),
  on(requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    isAllCoursesLoading: false,
    allCourses: [...courses],
  })),
  on(requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(requestDeleteCourse, (state, { id }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestDeleteCourseSuccess, (state) => ({
    ...state,
    isSingleCourseLoading: false,
    allCourses: state.allCourses.filter(
      (course) => course.id !== state.course?.id
    ),
    course: null,
  })),
  on(requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestEditCourse, (state, { id, course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    course: state.course?.id === course.id ? course : state.course,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
  })),
  on(requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestCreateCourse, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    allCourses: [...state.allCourses, course],
    course: course,
  })),
  on(requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
