import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(private router: Router, private authService: AuthService) {}
  @ViewChild("loginForm") public loginForm!: NgForm;

  public isVisible = false;
  protected submitted = false;

  submitLogin(form: NgForm) {
    this.submitted = true;
    if (!form.invalid) {
      this.authService.login(form.value);
    }
  }

  goToRegistration() {
    this.router.navigate(["registration"]);
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
}
