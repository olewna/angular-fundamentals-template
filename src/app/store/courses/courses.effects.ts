import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { CoursesService } from "@app/services/courses.service";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
} from "./courses.actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private coursesService: CoursesService
  ) {}

  requestAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((data) => requestAllCoursesSuccess({ courses: data.result })),
          catchError((error) => of(requestAllCoursesFail({ error })))
        )
      )
    )
  );

  //   createCourse$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(createCourse, deleteCourse),
  //         withLatestFrom(this.store.select(requestAllCourses)),
  //         switchMap(([action, courses]) =>
  //           this.coursesService.createCourse(courses)
  //         )
  //       ),
  //     { dispatch: false }
  //   );
}
