import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>('app');
export const getLanguage = createSelector(getAppState, (state: AppState) => state.language);
export const getRequestInProgress = createSelector(getAppState, (state: AppState) => state.requestInProgress);
export const showSelectLanguage = createSelector(getAppState, (state: AppState) => state.showSelectLanguage);

export const appQuery = {
  getLanguage,
  getRequestInProgress,
  showSelectLanguage
};
