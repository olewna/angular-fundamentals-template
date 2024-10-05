import { InjectionToken, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { CourseInfoModule } from "./features/course-info/course-info.module";
import { LoginModule } from "./shared/components/login-form/login.module";
import { AppRoutingModule } from "./app-routing.module";
import { RegistrationModule } from "./shared/components/registration-form/registration.module";
import { CoursesModule } from "./features/courses/courses.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { AuthModule } from "./auth/auth.module";
import { effects, reducers } from "./store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

export const WINDOW = new InjectionToken<Window>("WindowToken");

export function windowFactory(): Window {
  return window;
}

export const windowProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    CourseInfoModule,
    LoginModule,
    AppRoutingModule,
    RegistrationModule,
    CoursesModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    windowProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
