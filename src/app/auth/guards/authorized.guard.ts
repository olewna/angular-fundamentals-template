import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthFacade } from "@app/store/auth/auth.facade";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  public constructor(private router: Router, private authFacade: AuthFacade) {}
  canLoad(_route: Route) {
    if (this.authFacade.isAuthorized) {
      return true;
    } else {
      return this.router.parseUrl("/login");
    }
  }
}
