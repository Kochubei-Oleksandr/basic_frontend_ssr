import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Injectable, Injector} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {IAuth} from '../../components/auth/auth.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _injector: Injector,
    private _authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.getToken()) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this._authService.getToken()
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this._authService.refreshToken().pipe(
      switchMap((res: IAuth) => {
        if (res.token) {
          this._authService.setToken(res.token);
          request = request.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + res.token
            }
          });
          return next.handle(request);
        } else {
          this._authService.frontendLogout();
        }
      }),
      catchError(err => {
        this._authService.frontendLogout();
        return throwError(err);
      })
    );
  }
}
