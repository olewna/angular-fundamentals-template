import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  public constructor(private coursesStoreService: CoursesStoreService) {}
  @Input() placeholder = "";

  protected searchedTerm: string = "";

  searched() {
    if (this.searchedTerm) {
      this.coursesStoreService.filterCourses(this.searchedTerm);
    } else {
      this.coursesStoreService.getAll();
    }
  }
}
