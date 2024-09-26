import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationFormComponent } from "./registration-form.component";
import { SharedModule } from "@app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [RegistrationFormComponent],
})
export class RegistrationModule {}
