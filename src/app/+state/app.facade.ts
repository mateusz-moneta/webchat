import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppPartialState, AppState } from './app.reducer';
import { appQuery } from './app.selectors';
import { appActions } from './app.actions';

@Injectable()
export class AppFacade {
  language$ = this.store.pipe(select(appQuery.getLanguage));
  requestInProgress$ = this.store.pipe(select(appQuery.getRequestInProgress));
  showSelectLanguage$ = this.store.pipe(select(appQuery.showSelectLanguage));

  constructor(private store: Store<AppState>) { }

  loadLanguage(): void {
    this.store.dispatch(new appActions.LoadLanguage());
  }

  changeLanguage(language: string): void {
    this.store.dispatch(new appActions.SetLanguage(language));
  }

  setRequestInProgress(request: boolean): void {
    this.store.dispatch(new appActions.RequestInProgress(request));
  }

  toggleSelectLanguage(showSelectLanguage: boolean): void {
    this.store.dispatch(new appActions.ShowSelectLanguage(showSelectLanguage));
  }
}
