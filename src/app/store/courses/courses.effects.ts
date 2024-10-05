import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesService } from "@app/services/courses.service";
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
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private facade: CoursesStateFacade,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((data) => requestAllCoursesSuccess({ courses: data.result })),
          catchError((error) => of(requestAllCoursesFail({ error })))
        )
      )
    )
  );

  // filteredCourses$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(requestFilteredCourses),
  //     withLatestFrom(this.facade.allCourses$),
  //     map(([action, allCourses]) => {
  //       const filteredCourses = allCourses.filter(course =>
  //         course.title.toLowerCase().includes(action.title.toLowerCase())
  //       );
  //       return requestFilteredCoursesSuccess({ courses: filteredCourses });
  //     })
  //   )
  // );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((data) => requestSingleCourseSuccess({ course: data.result })),
          catchError((error) => of(requestSingleCourseFail({ error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => {
            requestAllCourses();
            requestDeleteCourseSuccess();
          }),
          catchError((error) => of(requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((data) => requestEditCourseSuccess({ course: data.result })),
          catchError((error) => of(requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((data) => requestCreateCourseSuccess({ course: data.result })),
          catchError((error) => of(requestCreateCourseFail({ error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        ),
        map(() => this.router.navigate(["courses"]))
      ),
    { dispatch: false }
  );
}
