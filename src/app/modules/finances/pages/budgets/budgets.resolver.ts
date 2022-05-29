import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BudgetService } from 'modules/finances/services';

@Injectable({
  providedIn: 'root',
})
export class BudgetsResolver implements Resolve<boolean> {
  constructor(private budgetService: BudgetService) {}

  resolve(): Observable<boolean> {
    return this.budgetService.loadBudgets();
  }
}
