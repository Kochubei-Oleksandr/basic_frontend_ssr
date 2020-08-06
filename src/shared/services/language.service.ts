import {EventEmitter, Inject, Injectable, OnInit, PLATFORM_ID} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {SERVICE_LANGUAGES} from '../constants/service-languages.const';
import {isPlatformBrowser} from "@angular/common";
import {BrowserLocalStorageService} from "../ssr-services/browser-local-storage.service";

@Injectable()
export class LanguageService {
  private _serviceLanguages = SERVICE_LANGUAGES;
  public currentLangEmit = new EventEmitter();

  constructor(
    private _translateService: TranslateService,
    protected _browserLocalStorage: BrowserLocalStorageService,
    @Inject(PLATFORM_ID) private _platformId,
  ) { }

  setAvailableLanguages(): void {
    this._translateService.addLangs([this._serviceLanguages.en, this._serviceLanguages.ru]);

    if (isPlatformBrowser(this._platformId) && this._serviceLanguages.hasOwnProperty(navigator.language)) {
      this._translateService.setDefaultLang(navigator.language);
    } else if (this._serviceLanguages.hasOwnProperty(this._translateService.getBrowserLang())) {
      this._translateService.setDefaultLang(this._translateService.getBrowserLang());
    } else {
      this._translateService.setDefaultLang(this._serviceLanguages.en);
    }
  }
  getInitialLanguage(): string {
    let langInLocalStorage = this._browserLocalStorage.getItem('language');
    return this._translateService.getLangs().includes(langInLocalStorage)
      ? langInLocalStorage
      : this._translateService.getDefaultLang();
  }
  setInitialLanguage(lang?: string): void {
    this.currentLanguage = lang
      ? lang
      : this.getInitialLanguage();
  }
  get currentLanguage(): string {
    return this._translateService.currentLang;
  }
  set currentLanguage(lang: string) {
    this._translateService.use(lang);
    this._browserLocalStorage.setItem('language', lang)
  }
}
