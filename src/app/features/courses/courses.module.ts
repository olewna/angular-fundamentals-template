import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoursesRoutingModule } from "./courses-routing.module";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [CoursesListComponent, CoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
