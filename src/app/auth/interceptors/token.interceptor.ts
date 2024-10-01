import { inject, Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { SessionStorageService } from "../services/session-storage.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req: any = request.clone({
      setHeaders: {
        Authorization: `Bearer ${
          inject(SessionStorageService).getToken() || ""
        }`,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          inject(AuthService).logout();
          inject(Router).parseUrl("/login");
        }

        return throwError(() => error);
      })
    );
  }
}
