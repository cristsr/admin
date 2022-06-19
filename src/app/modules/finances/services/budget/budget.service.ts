import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { BudgetRepository } from 'modules/finances/repositories';
import {
  Budget,
  BudgetAverage,
  CreateBudget,
  Movement,
  UpdateBudget,
} from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  #fetch = new Subject<void>();
  #average = new Subject<BudgetAverage>();

  constructor(private budgetRepository: BudgetRepository) {}

  next(): void {
    this.#fetch.next();
  }

  get budgets(): Observable<Budget[]> {
    return this.#fetch.pipe(switchMap(() => this.fetchBudgets()));
  }

  get average(): Observable<BudgetAverage> {
    return this.#average.asObservable();
  }

  fetchBudgets(): Observable<Budget[]> {
    return this.budgetRepository
      .getAll()
      .pipe(tap((budgets) => this.calculateAverage(budgets)));
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.budgetRepository.create(budget);
  }

  update(id: number, budget: UpdateBudget): Observable<Budget> {
    return this.budgetRepository.update(id, budget);
  }

  remove(id: number): Observable<number> {
    return this.budgetRepository.remove(id);
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.budgetRepository.getOne(id);
  }

  getBudgetMovements(budgetId: number): Observable<Movement[]> {
    return this.budgetRepository.movements(budgetId);
  }

  private calculateAverage(budgets: Budget[]): void {
    const { total, spent } = budgets.reduce(
      (state, budget) => ({
        total: state.total + budget.amount,
        spent: state.spent + budget.spent,
      }),
      {
        total: 0,
        spent: 0,
      },
    );

    const percentage = Math.round((spent / total) * 100);

    this.#average.next({
      percentage,
      spent,
      total,
    });
  }
}
