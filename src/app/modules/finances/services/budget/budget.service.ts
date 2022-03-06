import { Injectable } from '@angular/core';
import { BudgetRepository } from 'modules/finances/repositories';
import { Budget, CreateBudget } from 'modules/finances/types';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgets: Observable<Budget[]>;

  constructor(private budgetRepository: BudgetRepository) {}

  get budget$(): Observable<Budget[]> {
    if (!this.budgets) {
      this.budgets = this.budgetRepository.getAll().pipe(shareReplay(1));
    }

    return this.budgetRepository.getAll();
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.budgetRepository.create(budget);
  }
}
