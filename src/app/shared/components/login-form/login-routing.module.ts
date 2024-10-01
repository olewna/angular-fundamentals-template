import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
