import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromCourses from "./courses.selectors";
import * as CourseActions from "./courses.actions";
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

  public allCourses$ = this.store.pipe(select(fromCourses.getAllCourses));
  public filteredCourses$ = this.store.pipe(
    select(fromCourses.getFilteredCourses)
  );
  public course$ = this.store.pipe(select(fromCourses.getCourse));
  public errorMessage$ = this.store.pipe(select(fromCourses.getErrorMessage));

  public getAllCourses(): void {
    this.store.dispatch(CourseActions.requestAllCourses());
  }

  public getSingleCourse(id: string): void {
    this.store.dispatch(CourseActions.requestSingleCourse({ id }));
  }

  public getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CourseActions.requestFilteredCourses({ title: searchValue })
    );
  }

  public editCourse(body: CourseForm, id: string): void {
    this.store.dispatch(CourseActions.requestEditCourse({ id, course: body }));
  }

  public createCourse(body: CourseForm): void {
    this.store.dispatch(CourseActions.requestCreateCourse({ course: body }));
  }

  public deleteCourse(id: string): void {
    this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
  }
}
