import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import { CoinDashboardState } from '../state/coin.reducer';
import { selectAllCoins } from '../state/coin.selectors';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatCardModule
  ],
  templateUrl: './data-chart.component.html',
  styleUrl: './data-chart.component.scss'
})
export class DataChartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  constructor(private store: Store<{ coinState: CoinDashboardState }>) { }

  ngOnInit(): void {
    Highcharts.setOptions({
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    });
    // Fetch coin data from the store
    this.store.select(selectAllCoins)
      .pipe(takeUntil(this.destroy$))
      .subscribe((coins) => {
        // take the top 10 coins
        const topCoins = coins.slice(0, 10);

        // Extract data for the chart
        const dataSeries = topCoins.map((coin) => ({
          name: coin.name,
          y: coin.market_cap,
          symbol: coin.symbol,
          current_price: coin.current_price,
          total_volume: coin.total_volume
        }));

        // Configure chart options
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Top 10 Cryptos by Market Capitalization'
          },
          xAxis: {
            categories: topCoins.map((coin) => coin.name),
            title: {
              text: 'Cryptocurrency'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Market Cap (EUR)'
            }
          },
          tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: `
              <b>Market Cap:</b> ${'{point.y:,.2f}'} €<br>
              <b>Symbol:</b> ${'{point.symbol}'}<br>
              <b>Price:</b> ${'{point.current_price:,.2f}'} €<br>
              <b>Total Volume:</b> ${'{point.total_volume:,.2f}'} €<br>
            `
          },
          series: [{
            name: 'Market Cap',
            data: dataSeries,
            type: 'column',
            showInLegend: false
          }]
        };
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
