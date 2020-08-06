import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../models/user/user.class';
import {catchError, map} from 'rxjs/operators';
import {IAuth} from '../../../components/auth/auth.interface';
import {throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LogNotificationService} from "../log-notification.service";
import {Router} from "@angular/router";
import {BrowserLocalStorageService} from "../../ssr-services/browser-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  constructor(
    protected _browserLocalStorage: BrowserLocalStorageService,
    protected _http: HttpClient,
    protected _notification: LogNotificationService,
    protected _router: Router
  ) {
    super(_http, _notification, _router);
  }

  register(user: User) {
    return this
      .sendPost(this.getEndpoint('register'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  login(user: User) {
    return this
      .sendPost(this.getEndpoint('login'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  refreshToken() {
    return this.sendPost(this.getEndpoint('refresh-token'));
  }
  setToken(token): void {
    this._browserLocalStorage.setItem('token', token);
  }
  getToken(): string | null {
    return this._browserLocalStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  backendLogout():void {
    this.sendPost(this.getEndpoint('logout'))
      .pipe(
        catchError((err) => this.onError(err))
      )
      .subscribe(
        () => {
          this.frontendLogout();
        },
        (err) => {
          return throwError(err);
        }
      );
  }
  frontendLogout(): void {
    this._browserLocalStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
