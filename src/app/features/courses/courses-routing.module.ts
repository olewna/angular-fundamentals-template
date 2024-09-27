import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseFormComponent } from "@app/shared/components";
import { AdminGuard } from "@app/user/guards/admin.guard";
import { CourseInfoComponent } from "../course-info/course-info.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CoursesComponent,
  },
  {
    path: "add",
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: ":id",
    component: CourseInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
