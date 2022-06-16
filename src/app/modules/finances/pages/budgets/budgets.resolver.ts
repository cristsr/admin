import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, forkJoin, Observable } from 'rxjs';
import { BudgetService } from 'modules/finances/services';
import { BudgetPage } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class BudgetsResolver implements Resolve<BudgetPage> {
  constructor(private budgetService: BudgetService) {}

  resolve(): Observable<BudgetPage> {
    return forkJoin({
      budgets: this.budgetService.fetchBudgets(),
      average: this.budgetService.average.pipe(first()),
    });
  }
}
