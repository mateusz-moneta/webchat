import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { AppFacade } from '../../../+state/app.facade';
import { Language } from '@interfaces/language.interface';

@Injectable()
export class LanguageService {
  languageList: Language[] = [
    { code: 'en', title: 'English' },
    { code: 'pl', title: 'Polski' }
  ];

  private COOKIE_KEY = 'Language';

  constructor(private appFacade: AppFacade, private cookieService: CookieService, private translateService: TranslateService) {
    const currentLanguage = this.getCurrentLanguage();
    this.translateService.setDefaultLang(currentLanguage);
    this.translateService.use(currentLanguage);
  }

  changeLanguage(code: string): void {
    this.appFacade.changeLanguage(code);
    this.cookieService.set(this.COOKIE_KEY, code);
    this.translateService.setDefaultLang(code);
    this.translateService.use(code);
  }

  getCurrentLanguage(): string {
    return this.cookieService.get(this.COOKIE_KEY) || 'en';
  }

  translate(key: string): Observable<string> {
    return this.translateService.get(key);
  }
}
