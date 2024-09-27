import { Component, OnInit } from "@angular/core";
import { UserStoreService } from "./user/services/user-store.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "courses-app";
  protected username: string = "";

  public constructor(
    private userStoreService: UserStoreService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userStoreService.name$.subscribe({
      next: (res) => {
        this.username = res;
      },
    });
  }

  get loginStatus(): boolean {
    return this.authService.isAuthorised;
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.authService.logout();
  }
}
