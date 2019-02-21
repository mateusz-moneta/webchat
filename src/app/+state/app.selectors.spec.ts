import { AppState } from './app.reducer';
import { appQuery } from './app.selectors';

describe('App Selectors', () => {
  describe('App Selectors', () => {

    it('getLoaded() should return the current "loaded" status', () => {
      const result = appQuery.getLanguage;

      expect(result).toBe('en');
    });
  });
});
