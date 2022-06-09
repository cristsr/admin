import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { BudgetRepository } from 'modules/finances/repositories';
import {
  Budget,
  BudgetAverage,
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
  #budgets = new BehaviorSubject<Budget[]>(null);

  constructor(private budgetRepository: BudgetRepository) {}

  get budgets(): Observable<Budget[]> {
    if (!this.#budgets.value) {
      return this.budgetRepository.getAll().pipe(
        setArrayItems(this.#budgets),
        switchMap(() => this.#budgets.asObservable()),
      );
    }

    return this.#budgets.asObservable();
  }

  get average(): Observable<BudgetAverage> {
    return this.budgets.pipe(
      map((budgets) => {
        const total = budgets.reduce((acc, budget) => acc + budget.amount, 0);
        const spent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
        const percentage = Math.round((spent / total) * 100);

        return {
          percentage,
          spent,
          total,
        };
      }),
    );
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
    return this.budgetRepository
      .getOne(id)
      .pipe(updateArrayItem(this.#budgets));
  }

  getBudgetMovements(budgetId: number): Observable<Movement[]> {
    return this.budgetRepository.movements(budgetId);
  }

  patchBudget(movement: Movement): void {
    const value = this.#budgets.value;

    if (!value) {
      return;
    }

    const budget = value.find(
      (b: Budget) => b.category.id === movement.category.id,
    );

    if (!budget) {
      return;
    }

    this.getBudgetById(budget.id).subscribe();
  }
}
