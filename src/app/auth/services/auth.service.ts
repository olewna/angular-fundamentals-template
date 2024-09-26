import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User } from "@app/shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}
  public isAuthorized$ = new Observable();
  private isAuthorized$$ = new BehaviorSubject(false);

  login(user: User) {
    this.httpClient.post<any>(`https://localhost:4000/login`, user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result);
        }
      })
    );
  }

  logout() {
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.sessionStorageService.getToken() || ""
    );
    this.httpClient
      .delete<any>(`https://localhost:4000/logout`, {
        headers: httpHeaders,
      })
      .pipe(
        tap((response) => {
          if (response && response.status === 200) {
            this.sessionStorageService.deleteToken();
          }
        })
      );
  }

  register(user: User) {
    this.httpClient.post<any>(`https://localhost:4000/register`, user);
  }

  get isAuthorised() {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
  }
}
