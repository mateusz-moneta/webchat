import { LoadLanguageSuccess } from './app.actions';
import { AppState, initialState, appReducer } from './app.reducer';

describe('App Reducer', () => {
  describe('valid App actions ', () => {
    it('should return set the list of known App', () => {
      const language = 'en';
      const action = new LoadLanguageSuccess(language);
      const result: AppState = appReducer(initialState, action);

      expect(result.language).toBe('en');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = appReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
