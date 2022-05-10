import { Injectable } from '@angular/core';
import { BudgetRepository } from 'modules/finances/repositories';
import { Budget, CreateBudget, GroupMovement } from 'modules/finances/types';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgets: Observable<Budget[]>;

  constructor(private budgetRepository: BudgetRepository) {}

  get budgets$(): Observable<Budget[]> {
    if (!this.budgets) {
      this.budgets = this.budgetRepository.getAll().pipe(shareReplay(1));
    }

    return this.budgets;
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.budgets$.pipe(
      map((budgets: Budget[]) => {
        return budgets.find((budget: Budget) => budget.id === id);
      }),
    );
  }

  getBudgetMovements(id: number): Observable<GroupMovement[]> {
    return this.budgetRepository.movements(id);
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.budgetRepository.create(budget);
  }
}
