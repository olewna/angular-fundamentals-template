import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesService } from "@app/services/courses.service";
import * as CoursesActions from "./courses.actions";
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
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((data) => {
            return CoursesActions.requestAllCoursesSuccess({
              courses: data.result,
            });
          }),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.facade.allCourses$),
      map(([action, allCourses]) => {
        const filteredCourses = allCourses.filter((course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({
          courses: filteredCourses,
        });
      }),
      catchError((error) =>
        of(CoursesActions.requestFilteredCoursesFail({ error }))
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((data) =>
            CoursesActions.requestSingleCourseSuccess({ course: data.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          mergeMap(() => [
            CoursesActions.requestAllCourses(),
            CoursesActions.requestDeleteCourseSuccess(),
          ]),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((data) =>
            CoursesActions.requestEditCourseSuccess({ course: data.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((data) =>
            CoursesActions.requestCreateCourseSuccess({ course: data.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        map(() => this.router.navigate(["courses"]))
      ),
    { dispatch: false }
  );
}
