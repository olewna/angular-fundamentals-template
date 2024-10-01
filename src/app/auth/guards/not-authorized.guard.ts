import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authService.isAuthorised) {
      return this.router.parseUrl("/courses");
    } else {
      return true;
    }
  }
}
