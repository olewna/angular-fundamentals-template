import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";

export const routes: Routes = [
  {
    path: "courses",
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./shared/components/login-form/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./shared/components/registration-form/registration.module").then(
        (m) => m.RegistrationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
