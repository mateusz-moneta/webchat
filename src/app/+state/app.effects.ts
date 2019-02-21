import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AppPartialState } from './app.reducer';
import {
  AppActionTypes,
  LoadLanguage, LoadLanguageFail,
  LoadLanguageSuccess
} from './app.actions';
import { LanguageService } from '@shared/services/language.service';

@Injectable()
export class AppEffects {
  @Effect() loadLanguage$ = this.dataPersistence.fetch(AppActionTypes.LoadLanguage, {
    run: (action: LoadLanguage, state: AppPartialState) => {
      const language = this.languageService.getCurrentLanguage();
      return new LoadLanguageSuccess(language);
    },

    onError: (action: LoadLanguage, error) => {
      console.error('Error', error);
      return new LoadLanguageFail(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppPartialState>,
    private languageService: LanguageService
  ) {}
}
