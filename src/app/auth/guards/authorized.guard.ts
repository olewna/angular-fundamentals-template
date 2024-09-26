import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canLoad(_route: Route) {
    if (this.authService.isAuthorised) {
      return true;
    } else {
      return this.router.parseUrl("/login");
    }
  }
}
