import { Injectable } from '@angular/core';
import { BudgetRepository } from 'modules/finances/repositories';
import {
  Budget,
  CreateBudget,
  GroupMovement,
  UpdateBudget,
} from 'modules/finances/types';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {
  setArrayItems,
  insertArrayItem,
  removeArrayItem,
  updateArrayItem,
} from 'core/state';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  #budgets = new BehaviorSubject<Budget[] | null>(null);

  constructor(private budgetRepository: BudgetRepository) {}

  loadBudgets(): Observable<boolean> {
    if (this.#budgets.value) {
      return of(true);
    }

    return this.budgetRepository.getAll().pipe(
      setArrayItems(this.#budgets),
      map(() => true),
      catchError((e) => {
        console.error('Error loading budgets', e);
        this.#budgets.next(null);
        return of(false);
      }),
    );
  }

  get budgets(): Observable<Budget[]> {
    return this.#budgets.asObservable();
  }

  create(budget: CreateBudget): Observable<Budget> {
    return this.budgetRepository
      .create(budget)
      .pipe(insertArrayItem(this.#budgets));
  }

  update(id: number, budget: UpdateBudget): Observable<Budget> {
    return this.budgetRepository
      .update(id, budget)
      .pipe(updateArrayItem(this.#budgets));
  }

  remove(id: number): Observable<number> {
    return this.budgetRepository
      .remove(id)
      .pipe(removeArrayItem(this.#budgets));
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.budgetRepository.getOne(id);
  }

  getBudgetMovements(budgetId: number): Observable<GroupMovement[]> {
    return this.budgetRepository.movements(budgetId);
  }
}
