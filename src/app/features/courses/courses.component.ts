import { Component, OnInit } from "@angular/core";
import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "../../services/courses-store.service";
import { Router } from "@angular/router";
import { UserStoreService } from "../../user/services/user-store.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  get isAdmin() {
    return this.userStoreService.isAdmin;
  }

  ngOnInit(): void {
    this.courseStoreService.getAll();
    this.courseStoreService.courses$.subscribe({
      next: (res) => {
        this.posts = res;
      },
    });
  }

  public posts: Course[] = [];

  goToAddForm() {
    this.router.navigate(["courses", "add"]);
  }
}
