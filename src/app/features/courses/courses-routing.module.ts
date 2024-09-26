import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import {
  CourseCardComponent,
  CourseFormComponent,
} from "@app/shared/components";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CoursesComponent,
  },
  {
    path: "add",
    component: CourseFormComponent,
  },
  {
    path: "edit/:id",
    component: CourseFormComponent,
  },
  {
    path: ":id",
    component: CourseCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
