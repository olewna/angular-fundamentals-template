import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author } from "@app/shared/models/author.model";
import { Course } from "@app/shared/models/course.model";
import { UserFacade } from "@app/store/user/user.facade";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent implements OnInit {
  public constructor(
    private coursesStoreService: CoursesStoreService,
    private userFacade: UserFacade,
    private router: Router
  ) {}
  protected authors: Author[] = [];

  get isAdmin() {
    return this.userFacade.isAdmin;
  }

  ngOnInit(): void {
    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.authors$.subscribe({
      next: (res: Author[]) => {
        this.authors = res;
      },
    });
  }

  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  goToAddForm() {
    this.router.navigate(["courses", "add"]);
  }

  goToEdit(id: string) {
    this.router.navigate(["courses", "edit", id]);
  }
}
