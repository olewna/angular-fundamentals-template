import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthFacade } from "@app/store/auth/auth.facade";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  public constructor(private router: Router, private authFacade: AuthFacade) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authFacade.isAuthorized) {
      return this.router.parseUrl("/courses");
    } else {
      return true;
    }
  }
}
