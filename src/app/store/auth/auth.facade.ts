import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../index";
import * as AuthActions from "./auth.actions";
import * as fromAuth from "./auth.selector";
import { User } from "@app/shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthFacade {
  constructor(private store: Store<AppState>) {
    this.store.pipe(select(fromAuth.isAuthorizedSelector)).subscribe({
      next: (val) => {
        this._isAuthorized = val;
      },
    });
  }

  private _isAuthorized = false;

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  errorMessage$ = this.store.pipe(select(fromAuth.errorMessageSelector));

  public login(user: User): void {
    this.store.dispatch(AuthActions.login({ user }));
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  public register(user: User) {
    this.store.dispatch(AuthActions.register({ user }));
  }
}
