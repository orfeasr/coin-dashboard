import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { coinsLoading, coinsSuccess, coinsFail } from './coin.actions';
import { CoinDataService } from '../coin-data.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class CoinEffects {
  coinsLoading$: Observable<any>;

  constructor(
    private actions$: Actions,
    private coinService: CoinDataService
  ) {

    this.coinsLoading$ = createEffect(() =>
      this.actions$.pipe(
        ofType(coinsLoading),
        mergeMap((action) =>
          this.coinService.fetchCoins(action.page, action.perPage).pipe(
            map((coins) => coinsSuccess({ coins })),
            catchError((error) => of(coinsFail({ error })))
          )
        )
      )
    );
  }



}
