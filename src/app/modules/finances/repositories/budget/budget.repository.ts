import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import { map, Observable } from 'rxjs';
import {
  Budget,
  CreateBudget,
  Movement,
  UpdateBudget,
} from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class BudgetRepository {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.apiUrl = config.get(ENV.FINANCES_API) + 'budgets/';
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.httpClient.post<Budget>(this.apiUrl, budget);
  }

  getAll(): Observable<Budget[]> {
    return this.httpClient.get<Budget[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Budget> {
    return this.httpClient.get<Budget>(this.apiUrl + id);
  }

  update(id: number, budget: UpdateBudget): Observable<Budget> {
    return this.httpClient.patch<Budget>(this.apiUrl + id, budget);
  }

  remove(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.apiUrl + id).pipe(map(() => id));
  }

  movements(budgetId: number): Observable<Movement[]> {
    return this.httpClient.get<Movement[]>(
      this.apiUrl + budgetId + '/movements/',
    );
  }
}
