import { Component, OnInit } from "@angular/core";
import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "../../services/courses-store.service";
import { Router } from "@angular/router";
import { UserStoreService } from "../../user/services/user-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private courseStoreService: CoursesStoreService,
    private courseFacade: CoursesStateFacade,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  public courses: Course[] = [];
  protected courses$ = this.courseFacade.allCourses$;
  protected isLoading$ = this.courseFacade.isAllCoursesLoading$;

  get isAdmin() {
    return this.userStoreService.isAdmin;
  }

  ngOnInit(): void {
    this.courseFacade.getAllCourses();

    this.courseFacade.allCourses$.subscribe({
      next: (res) => {
        this.courses = res;
      },
    });
  }

  goToAddForm() {
    this.router.navigate(["courses", "add"]);
  }
}
