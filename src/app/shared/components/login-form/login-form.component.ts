import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthFacade } from "@app/store/auth/auth.facade";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(private router: Router, private authFacade: AuthFacade) {}
  @ViewChild("loginForm") public loginForm!: NgForm;

  public isVisible = false;
  protected submitted = false;

  submitLogin(form: NgForm) {
    this.submitted = true;
    if (!form.invalid) {
      this.authFacade.login(form.value);
    }
  }

  goToRegistration() {
    this.router.navigate(["registration"]);
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
}
