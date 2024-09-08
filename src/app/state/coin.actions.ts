import { createAction, props } from '@ngrx/store';

export const coinsLoading = createAction('[Coin] Loading data from CoinGecko', props<{ page: number, perPage: number }>());
export const coinsSuccess = createAction('[Coin] Loading data from CoinGecko Success', props<{ coins: any[] }>());
export const coinsFail = createAction('[Coin] Loading data from CoinGecko Fail', props<{ error: string }>());
