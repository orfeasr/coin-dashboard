import { ApplicationConfig, provideZoneChangeDetection,  } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { coinReducer } from './state/coin.reducer';
import { provideEffects } from '@ngrx/effects';
import { CoinEffects } from './state/coin.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'coins', reducer: coinReducer }),
    provideEffects(CoinEffects)
  ]
};
