import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BrowserLocalStorageService} from "../ssr-services/browser-local-storage.service";

@Injectable()
export class InitialRequestsService {
  constructor (
    private _translateService: TranslateService,
    protected _browserLocalStorage: BrowserLocalStorageService,
  ) { }

  languageChangeRequests(): void {
    this._translateService.onLangChange.subscribe(() => {
      this.unauthorized();
    });
  }

  unauthorized(): void {
    //queries to get static data from the database
  }
  authorized(): void {
    if (this._browserLocalStorage.getItem('token')) {
      //queries to get static data from the database
    }
  }
}
