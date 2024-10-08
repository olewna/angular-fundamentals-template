import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User } from "@app/shared/models/user.model";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}
  public isAuthorized$ = new Observable();
  private isAuthorized$$ = new BehaviorSubject(false);
  private baseUrl = environment.apiUrl;

  login(user: User) {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, user);
    //     .pipe(
    //       tap((response) => {
    //         if (response && response.result) {
    //           this.sessionStorageService.setToken(response.result.slice(7));
    //         }
    //       })
    //     )
    //     .subscribe({
    //       next: (_res) => {
    //         this.isAuthorized$$.next(true);
    //         this.userStoreService.getUser();
    //         this.router.navigate(["/courses"]);
    //       },
    //     });
  }

  logout() {
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.sessionStorageService.getToken() || ""
    );
    return this.httpClient.delete<any>(`${this.baseUrl}/logout`, {
      headers: httpHeaders,
    });
    // .pipe(
    //   tap((response) => {
    //     if (response && response.status === 200) {
    //       this.sessionStorageService.deleteToken();
    //     }
    //   })
    // )
    // .subscribe({
    //   next: () => {
    //     this.isAuthorized$$.next(false);
    //     this.router.navigate(["/login"]);
    //   },
    // });
  }

  register(user: User) {
    return this.httpClient.post<any>(`${this.baseUrl}/register`, user);
    // .subscribe({
    //   next: () => {
    //     this.router.navigate(["/login"]);
    //   },
    // });
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
