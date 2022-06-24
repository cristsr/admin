import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'env';
import { Balance, ExpensesRaw, Movement } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class SummaryRepository {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.financesApi + 'summary/';
  }

  balance(): Observable<Balance> {
    return this.httpClient.get<Balance>(this.apiUrl + 'balance');
  }

  expenses(): Observable<ExpensesRaw> {
    return this.httpClient.get<ExpensesRaw>(this.apiUrl + 'expenses');
  }

  lastMovements(): Observable<Movement[]> {
    return this.httpClient.get<Movement[]>(this.apiUrl + 'last-movements');
  }
}
