import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
