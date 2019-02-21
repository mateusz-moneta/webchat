import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { AppEffects } from './app.effects';
import { LoadLanguage, LoadLanguageSuccess } from './app.actions';

describe('AppEffects', () => {
  let actions: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AppEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AppEffects);
  });

  describe('loadLanguage$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadLanguage() });
      expect(effects.loadLanguage$).toBeObservable(
        hot('-a-|', { a: new LoadLanguageSuccess('en') })
      );
    });
  });
});
