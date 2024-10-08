import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../user/services/user.service";
import * as UserActions from "./user.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}
  requestUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.requestUser),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map((data) => {
            const isAdmin = data.result.role === "admin";
            const name = data.result.name;
            return UserActions.requestUserSuccess({ name, isAdmin });
          }),
          catchError((error) => of(UserActions.requestUserFail({ error })))
        )
      )
    )
  );
}
