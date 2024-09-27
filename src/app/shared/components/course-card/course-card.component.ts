import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Author } from "@app/shared/models/author.model";
import { Course } from "@app/shared/models/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";
import { parseDateDDMMYYYY } from "../../../../assets/parseDate";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  public constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}
  @Input() course: Course | null = null;
  @Input() editable: boolean = false;
  @Input() authors: Author[] = [];

  get isAdmin() {
    return this.userStoreService.isAdmin;
  }

  get courseAuthors() {
    return this.course?.authors.map((authorId) => {
      return this.authors.filter((x) => x.id === authorId)[0]?.name;
    });
  }

  get stringToDate(): Date {
    return parseDateDDMMYYYY(this.course?.creationDate!);
  }

  goToInfoCourse() {
    this.router.navigate(["/courses/" + this.course?.id]);
  }

  @Output() clickOnShow = new EventEmitter();
}
