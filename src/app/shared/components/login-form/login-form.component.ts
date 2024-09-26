import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(private router: Router) {}
  @ViewChild("loginForm") public loginForm!: NgForm;

  isVisible: boolean = false;
  protected submitted: boolean = false;

  submitLogin(form: NgForm) {
    console.log(form);
    this.submitted = true;
  }

  goToRegistration() {
    // console.log("go to registration");
    this.router.navigate(["registration"]);
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
}
