import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoinDashboardState } from './coin.reducer';

// Create a feature selector
export const selectCoinState = createFeatureSelector<CoinDashboardState>('coins');

// Create selectors to access specific properties

export const selectAllCoins = createSelector(
  selectCoinState,
  (state: CoinDashboardState) => state.coins
);

export const selectLoading = createSelector(
  selectCoinState,
  (state: CoinDashboardState) => state.loading
);

export const selectError = createSelector(
  selectCoinState,
  (state: CoinDashboardState) => state.error
);
