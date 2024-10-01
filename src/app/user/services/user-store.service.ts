import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  public constructor(private userService: UserService) {}
  private name$$ = new BehaviorSubject("");
  private isAdmin$$ = new BehaviorSubject(false);

  public name$ = this.name$$.asObservable();
  public isAdmin$ = this.isAdmin$$.asObservable();

  getUser() {
    this.userService
      .getUser()
      .pipe(
        tap((result) => {
          if (result && result.result.role === "admin") {
            this.isAdmin = true;
          } else this.isAdmin = false;
        }),
        catchError((error) => {
          console.error("getUser ERROR", error);
          return [];
        })
      )
      .subscribe((res) => {
        this.name$$.next(res.result.name);
      });
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
