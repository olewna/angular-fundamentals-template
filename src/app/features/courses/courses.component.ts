import { Component, OnInit } from "@angular/core";
import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "../../services/courses-store.service";
import { Router } from "@angular/router";
import { UserStoreService } from "../../user/services/user-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserFacade } from "@app/store/user/user.facade";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private courseFacade: CoursesStateFacade,
    private userFacade: UserFacade,
    private router: Router
  ) {}

  public isSearchingState = false;
  protected courses$ = this.courseFacade.allCourses$;
  protected filteredCourses$ = this.courseFacade.filteredCourses$;
  protected isLoading$ = this.courseFacade.isAllCoursesLoading$;

  get isAdmin() {
    return this.userFacade.isAdmin;
  }

  ngOnInit(): void {
    this.courseFacade.getAllCourses();

    this.courseFacade.isSearchingState$.subscribe({
      next: (value) => {
        this.isSearchingState = value;
      },
    });
  }

  goToAddForm() {
    this.router.navigate(["courses", "add"]);
  }
}
