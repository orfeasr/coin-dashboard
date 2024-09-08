import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinDashboardState } from '../state/coin.reducer';
import { selectAllCoins } from '../state/coin.selectors';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'symbol',
    'current_price',
    'market_cap',
    'total_volume',
    'high_24h',
    'low_24h',
    'price_change_percentage_24h',
    'circulating_supply',
  ];

  dataSource = new MatTableDataSource<any>();
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  coins$: Observable<any[]>;

  // Controls for filters
  nameFilter = new FormControl('');
  symbolFilter = new FormControl('');
  marketCapFilter = new FormControl('');

  constructor(private store: Store<{ coinState: CoinDashboardState }>) {
    this.coins$ = this.store.select(selectAllCoins);
  }

  ngOnInit(): void {

    this.store.select(selectAllCoins).subscribe(coins => {
      this.dataSource.data = coins;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.searchControl.valueChanges.subscribe((value) => {
      this.search(value!);
    });

    this.nameFilter.valueChanges.subscribe((value) => {
      this.applyFilters();
    });

    this.symbolFilter.valueChanges.subscribe((value) => {
      this.applyFilters();
    });

    this.marketCapFilter.valueChanges.subscribe((value) => {
      this.applyFilters();
    });
  }

  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilters() {
    const filterValues = {
      name: this.nameFilter.value,
      symbol: this.symbolFilter.value,
      marketCap: this.marketCapFilter.value,
    };

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filterObj = JSON.parse(filter);
      const matchName = !filterObj.name || data.name === filterObj.name;
      const matchSymbol = !filterObj.symbol || data.symbol === filterObj.symbol;
      const matchMarketCap = !filterObj.marketCap || data.market_cap === filterObj.marketCap;
      return matchName && matchSymbol && matchMarketCap;
    };

    this.dataSource.filter = JSON.stringify(filterValues);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
