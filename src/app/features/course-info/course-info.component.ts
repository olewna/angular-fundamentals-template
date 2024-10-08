import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author } from "@app/shared/models/author.model";
import { Course } from "@app/shared/models/course.model";
import { parseDateDDMMYYYY } from "src/assets/parseDate";
import { CoursesStateFacade } from "../../store/courses/courses.facade";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private coursesFacade: CoursesStateFacade,
    private location: Location
  ) {}

  @Input() course: Course | null = null;

  private id = "";
  private authors: Author[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.coursesStoreService.authors$.subscribe({
      next: (authors) => {
        this.authors = authors;
      },
    });

    this.coursesFacade.course$.subscribe({
      next: (course) => {
        this.course = course;
      },
    });

    this.coursesFacade.getSingleCourse(this.id);
  }

  get courseAuthors() {
    return this.course?.authors.map((authorId) => {
      return this.authors.find((author) => author.id === authorId)?.name ?? "";
    });
  }

  get stringToDate(): Date {
    return parseDateDDMMYYYY(this.course!.creationDate);
  }

  public goBack() {
    this.location.back();
  }
}
