import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { coinsLoading } from './state/coin.actions';
import { CoinDashboardState } from './state/coin.reducer';
import { Observable } from 'rxjs';
import { selectAllCoins, selectError, selectLoading } from './state/coin.selectors';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    CommonModule,
    DataTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Coin dashboard';
  coins$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ coinState: CoinDashboardState }>) {
    this.coins$ = this.store.select(selectAllCoins);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(coinsLoading({ page: 1, perPage: 250 }));
  }
}
