import { Injectable } from '@angular/core';
import { BudgetRepository } from 'modules/finances/repositories';
import {
  Budget,
  CreateBudget,
  GroupMovement,
  UpdateBudget,
} from 'modules/finances/types';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  #budgets = new BehaviorSubject<Budget[] | null>([]);

  constructor(private budgetRepository: BudgetRepository) {}

  loadBudgets(): Observable<boolean> {
    return this.budgetRepository.getAll().pipe(
      map((budgets: Budget[]) => {
        this.#budgets.next(budgets);
        return true;
      }),
      catchError((e) => {
        this.#budgets.next(null);
        console.error('Error loading budgets', e);
        return of(false);
      }),
    );
  }

  get budgets(): Observable<Budget[]> {
    return this.#budgets.asObservable();
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.budgetRepository.create(budget).pipe(
      tap((result: Budget) => {
        this.#budgets.next([...this.#budgets.value, result]);
      }),
    );
  }

  update(id: number, budget: UpdateBudget): Observable<Budget> {
    return this.budgetRepository.update(id, budget).pipe(
      tap((result: Budget) => {
        this.#budgets.next(
          this.#budgets.value.map((b) => (b.id === id ? result : b)),
        );
      }),
    );
  }

  remove(id: number): Observable<void> {
    return this.budgetRepository.remove(id).pipe(
      tap(() => {
        const budgets = this.#budgets.value;
        this.#budgets.next(budgets.filter((budget) => budget.id !== id));
      }),
    );
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.budgets.pipe(
      map((budgets: Budget[]) => {
        return budgets.find((budget: Budget) => budget.id === id);
      }),
    );
  }

  getBudgetMovements(budgetId: number): Observable<GroupMovement[]> {
    return this.budgetRepository.movements(budgetId);
  }
}
