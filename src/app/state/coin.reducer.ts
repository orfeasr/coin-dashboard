import { createReducer, on } from '@ngrx/store';
import { coinsLoading, coinsSuccess, coinsFail } from './coin.actions';

export interface CoinDashboardState {
  coins: any[];
  error: string | null;
  loading: boolean;
}

export const initialState: CoinDashboardState = {
  coins: [],
  error: null,
  loading: false,
};

export const coinReducer = createReducer(
  initialState,
  on(coinsLoading, (state) => ({
    ...state,
    loading: true
  })),
  on(coinsSuccess, (state, { coins }) => ({
    ...state,
    coins,
    loading: false,
    error: null,
  })),
  on(coinsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
