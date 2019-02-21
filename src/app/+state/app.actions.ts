import { Action } from '@ngrx/store';

export enum AppActionTypes {
  LoadLanguage = '[App] Load Language',
  LoadLanguageFail = '[App] Load Language Fail',
  LoadLanguageSuccess = '[App] Load Language Success',
  RequestInProgress = '[App] Request In Progress',
  SetLanguage = '[App] Set Language',
  ShowSelectLanguage = '[App] Show Select Language',
}

export class LoadLanguage implements Action {
  readonly type = AppActionTypes.LoadLanguage;
}

export class LoadLanguageSuccess implements Action {
  readonly type = AppActionTypes.LoadLanguageSuccess;

  constructor(public payload: string) {
  }
}

export class LoadLanguageFail implements Action {
  readonly type = AppActionTypes.LoadLanguageFail;

  constructor(public payload: Error) {
  }
}

export class RequestInProgress implements Action {
  readonly type = AppActionTypes.RequestInProgress;

  constructor(public payload: boolean) {
  }
}

export class SetLanguage implements Action {
  readonly type = AppActionTypes.SetLanguage;

  constructor(public payload: string) {
  }
}

export class ShowSelectLanguage implements Action {
  readonly type = AppActionTypes.ShowSelectLanguage;

  constructor(public payload: boolean) {
  }
}

export type AppAction = LoadLanguage | LoadLanguageFail | LoadLanguageSuccess | RequestInProgress | SetLanguage | ShowSelectLanguage;

export const appActions = {
  LoadLanguage,
  LoadLanguageFail,
  LoadLanguageSuccess,
  RequestInProgress,
  SetLanguage,
  ShowSelectLanguage
};
