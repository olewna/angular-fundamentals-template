import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromCourses from "./courses.selectors";
import * as courseActions from "./courses.actions";
import { AppState } from "..";
import { Course, CourseForm } from "@app/shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  constructor(private store: Store<AppState>) {}

  public isAllCoursesLoading$ = this.store.pipe(
    select(fromCourses.isAllCoursesLoadingSelector)
  );
  public isSingleCourseLoading$ = this.store.pipe(
    select(fromCourses.isSingleCourseLoadingSelector)
  );
  public isSearchingState$ = this.store.pipe(
    select(fromCourses.isSearchingStateSelector)
  );
  public courses$ = this.store.pipe(select(fromCourses.getCourses));
  public allCourses$ = this.store.pipe(select(fromCourses.getAllCourses));
  public course$ = this.store.pipe(select(fromCourses.getCourse));
  public errorMessage$ = this.store.pipe(select(fromCourses.getErrorMessage));

  public getAllCourses(): void {
    this.store.dispatch(courseActions.requestAllCourses());
  }

  public getSingleCourse(id: string): void {
    this.store.dispatch(courseActions.requestSingleCourse({ id }));
  }

  public getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      courseActions.requestFilteredCourses({ title: searchValue })
    );
  }

  public editCourse(body: CourseForm, id: string): void {
    this.store.dispatch(courseActions.requestEditCourse({ id, course: body }));
  }

  public createCourse(body: CourseForm): void {
    this.store.dispatch(courseActions.requestCreateCourse({ course: body }));
  }

  public deleteCourse(id: string): void {
    this.store.dispatch(courseActions.requestDeleteCourse({ id }));
  }
}
