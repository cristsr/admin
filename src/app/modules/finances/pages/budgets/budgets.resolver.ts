import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, first, map, Observable, of } from 'rxjs';
import { BudgetService } from 'modules/finances/services';

@Injectable({
  providedIn: 'root',
})
export class BudgetsResolver implements Resolve<boolean> {
  constructor(private budgetService: BudgetService) {}

  resolve(): Observable<boolean> {
    return this.budgetService.budgets.pipe(
      first(),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
