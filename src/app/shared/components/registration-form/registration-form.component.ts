import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { EmailValidatorDirective } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  protected registrationForm!: FormGroup;
  protected submitted = false;
  protected isVisible = false;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submitRegistration() {
    this.authService.register(this.registrationForm.value);
    this.submitted = true;
    this.goToLogin();
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }
}
