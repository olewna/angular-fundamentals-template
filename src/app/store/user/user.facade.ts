import { select, Store } from "@ngrx/store";
import { AppState } from "..";
import { Injectable } from "@angular/core";
import * as fromUser from "./user.selectors";
import * as UserAction from "./user.actions";

@Injectable({
  providedIn: "root",
})
export class UserFacade {
  constructor(private store: Store<AppState>) {
    this.store.pipe(select(fromUser.isAdminSelector)).subscribe({
      next: (value) => {
        this._isAdmin = value;
      },
    });
  }

  private _isAdmin = false;

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  public name$ = this.store.pipe(select(fromUser.nameSelector));
  public errorMessage$ = this.store.pipe(select(fromUser.errorMessageSelector));

  public getUser() {
    this.store.dispatch(UserAction.requestUser());
  }
}
