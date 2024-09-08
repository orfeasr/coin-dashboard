import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinDataService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) { }

  // fetch data from CoinGecko with user-defined params: page, perPage
  fetchCoins(page=0, perPage=250): Observable<any> {
    const params = new HttpParams()
      .set('vs_currency', 'eur')
      .set('order', 'market_cap_desc')
      .set('per_page', perPage)
      .set('page', page)
      .set('sparkline', 'false');


    return this.http.get(this.apiUrl, { params }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // error handling
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Something\'s wrong. Unknown error!';
    if (err.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error message: ${err.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${err.status}\nError message: ${err.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
