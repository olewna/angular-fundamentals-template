import { Component, OnInit } from "@angular/core";
import { UserStoreService } from "./user/services/user-store.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";
import { UserFacade } from "./store/user/user.facade";
import { AuthFacade } from "./store/auth/auth.facade";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public title = "courses-app";
  protected username = "";

  public constructor(
    private userFacade: UserFacade,
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.name$.subscribe({
      next: (res) => {
        this.username = res!;
      },
    });
  }

  get loginStatus(): boolean {
    return this.authFacade.isAuthorized;
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.authFacade.logout();
  }
}
