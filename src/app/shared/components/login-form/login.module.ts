import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginFormComponent } from "./login-form.component";
import { SharedModule } from "@app/shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, FormsModule],
  exports: [LoginFormComponent],
})
export class LoginModule {}
