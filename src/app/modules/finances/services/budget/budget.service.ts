import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BudgetRepository } from 'modules/finances/repositories';
import {
  Budget,
  CreateBudget,
  Movement,
  UpdateBudget,
} from 'modules/finances/types';
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

  get budgets(): Observable<Budget[]> {
    if (!this.#budgets.value) {
      return this.budgetRepository.getAll().pipe(setArrayItems(this.#budgets));
    }

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
    // Return from cache if available
    if (this.#budgets.value) {
      return this.budgets.pipe(
        map((budgets) => budgets.find((b) => b.id === id)),
      );
    }

    // Otherwise fetch from server
    return this.budgetRepository.getOne(id);
  }

  getBudgetMovements(budgetId: number): Observable<Movement[]> {
    return this.budgetRepository.movements(budgetId);
  }
}
