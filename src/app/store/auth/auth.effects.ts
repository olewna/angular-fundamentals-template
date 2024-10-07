import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "@app/auth/services/auth.service";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { UserFacade } from "../user/user.facade";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.user).pipe(
          map((data) => {
            return AuthActions.loginSuccess({
              token: data.result.slice(7),
            });
          }),
          catchError((error) => of(AuthActions.loginFail({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((data) => {
          this.sessionStorageService.setToken(data.token);
          this.userFacade.getUser();
          this.router.navigate(["/courses"]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.sessionStorageService.deleteToken();
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register(action.user).pipe(
          map((_data) => {
            return AuthActions.registerSuccess();
          }),
          catchError((error) => of(AuthActions.registerFail({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => this.router.navigate(["/login"]))
    )
  );
}
