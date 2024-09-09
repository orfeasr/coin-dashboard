import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { coinsLoading } from './state/coin.actions';
import { CoinDashboardState } from './state/coin.reducer';
import { Observable } from 'rxjs';
import { selectAllCoins, selectError, selectLoading } from './state/coin.selectors';
import { DataTableComponent } from './data-table/data-table.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import localeEl from '@angular/common/locales/el';
registerLocaleData(localeEl, 'el-GR');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    DataTableComponent,
    DataChartComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'el-GR' }
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
