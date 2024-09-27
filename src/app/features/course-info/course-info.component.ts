import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author } from "@app/shared/models/author.model";
import { Course } from "@app/shared/models/course.model";
import { parseDateDDMMYYYY } from "src/assets/parseDate";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private location: Location
  ) {}

  @Input() course: Course | null = null;

  private id: string = "";
  private authors: Author[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.coursesStoreService.getCourse(this.id);
    this.coursesStoreService.authors$.subscribe({
      next: (authors) => {
        this.authors = authors;
      },
    });
    this.coursesStoreService.courses$.subscribe({
      next: (courses) => {
        this.course = courses[0];
      },
    });
  }

  get courseAuthors() {
    return this.course?.authors.map((authorId) => {
      return this.authors.filter((x) => x.id === authorId)[0]?.name;
    });
  }

  get stringToDate(): Date {
    return parseDateDDMMYYYY(this.course?.creationDate!);
  }

  public goBack() {
    this.location.back();
  }
}
