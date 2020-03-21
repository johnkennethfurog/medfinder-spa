import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { catchError, switchMap, filter, take } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  //   private isRefreshing = false;
  //   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
  //     null
  //   );

  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getStoredAccessToken()) {
      req = this.addToken(req, this.authService.getStoredAccessToken());
    }

    return next.handle(req).pipe(
      catchError(error => {
        return throwError(error);
      })
    );

    // for refresh token
    /*.pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.authService.clearStordedAccessToken();
                    return this.handle401Error(req, next);
                } else {
                    return throwError(error);
                }
            }));*/
  }

  //   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //     if (!this.isRefreshing) {
  //       this.isRefreshing = true;
  //       this.refreshTokenSubject.next(null);

  //       return this.authService.getAccessToken().pipe(
  //         switchMap(token => {
  //           console.log("token refreshed", token.accessToken);
  //           this.isRefreshing = false;
  //           this.refreshTokenSubject.next(token);
  //           return next.handle(this.addToken(request, token.accessToken));
  //         })
  //       );
  //     } else {
  //       return this.refreshTokenSubject.pipe(
  //         filter(token => token != null),
  //         take(1),
  //         switchMap(token => {
  //           return next.handle(this.addToken(request, token.accessToken));
  //         })
  //       );
  //     }
  //   }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });
  }
}
