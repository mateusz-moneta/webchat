import { AppAction, AppActionTypes } from './app.actions';

export const APP_FEATURE_KEY = 'app';

/**
 * Interface for the 'App' data used in
 *  - AppState, and
 *  - appReducer
 *
 *  Note: replace if already defined in another module
 */

export interface AppState {
  language: string;
  requestInProgress: boolean;
  showSelectLanguage: boolean;
}

export const initialState: AppState = {
  language: 'en',
  requestInProgress: false,
  showSelectLanguage: true
};

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export function appReducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes.LoadLanguage: {
      state = {
        ...state
      };
      break;
    }
    case AppActionTypes.LoadLanguageSuccess: {
      state = {
        ...state,
        language: action.payload
      };
      break;
    }
    case AppActionTypes.RequestInProgress: {
      state = {
        ...state,
        requestInProgress: action.payload
      };
      break;
    }
    case AppActionTypes.SetLanguage: {
      state = {
        ...state,
        language: action.payload
      };
      break;
    }
    case AppActionTypes.ShowSelectLanguage: {
      state = {
        ...state,
        showSelectLanguage: action.payload
      };
      break;
    }
  }
  return state;
}
