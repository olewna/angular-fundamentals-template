import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, tap } from "rxjs";
import { CoursesService } from "./courses.service";
import { Course, CourseForm } from "@app/shared/models/course.model";
import { Author } from "@app/shared/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  public constructor(private coursesService: CoursesService) {}
  private isLoading$$ = new BehaviorSubject(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  getAll() {
    this.isLoading$$.next(true);

    this.coursesService
      .getAll()
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.error("getAll ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.courses$$.next(res.result);
      });
  }

  createCourse(course: CourseForm) {
    this.isLoading$$.next(true);

    this.coursesService
      .createCourse(course)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.error("createCourse ERROR", error);
          return [];
        })
      )
      .subscribe((_res) => {
        this.getAll();
      });
  }

  getCourse(id: string) {
    this.isLoading$$.next(true);

    this.coursesService
      .getCourse(id)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.error("getCourse ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.courses$$.next([res.result]);
      });
  }

  editCourse(id: string, course: CourseForm) {
    this.isLoading$$.next(true);

    this.coursesService
      .editCourse(id, course)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("EditCourse ERROR", error);
          return [];
        })
      )
      .subscribe((_res) => {
        this.getAll();
      });
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);

    this.coursesService
      .deleteCourse(id)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("deleteCourse ERROR", error);
          return [];
        })
      )
      .subscribe((_res) => {
        this.getAll();
      });
  }

  filterCourses(value: string) {
    this.isLoading$$.next(true);

    this.coursesService
      .filterCourses(value)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("filterCourses ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.courses$$.next(res.result);
      });
  }

  getAllAuthors() {
    this.isLoading$$.next(true);

    this.coursesService
      .getAllAuthors()
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("getAllAuthors ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.authors$$.next(res.result);
      });
  }

  createAuthor(name: string) {
    this.isLoading$$.next(true);

    return this.coursesService.createAuthor(name).pipe(
      finalize(() => this.isLoading$$.next(false)),
      catchError((error) => {
        console.log("createAuthor ERROR", error);
        return [];
      })
    );
  }

  getAuthorById(id: string) {
    this.isLoading$$.next(true);

    this.coursesService
      .getAuthorById(id)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("getAuthorById ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.authors$$.next([res.result]);
      });
  }

  deleteAuthor(id: string) {
    this.isLoading$$.next(true);

    this.coursesService
      .deleteAuthor(id)
      .pipe(
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.log("deleteAuthor ERROR", error);
          return [];
        })
      )
      .subscribe((_res) => {
        this.getAllAuthors();
      });
  }
}
