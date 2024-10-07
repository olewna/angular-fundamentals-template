import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  public constructor(
    private coursesStoreService: CoursesStoreService,
    private coursesFacade: CoursesStateFacade
  ) {}
  @Input() placeholder = "";

  protected searchedTerm = "";

  searched() {
    if (this.searchedTerm) {
      this.coursesFacade.getFilteredCourses(this.searchedTerm);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }
}
