import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { first, forkJoin, Observable } from 'rxjs';
import { BudgetService } from 'modules/finances/services';
import { BudgetDetail } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class BudgetDetailResolver implements Resolve<BudgetDetail> {
  constructor(private budgetService: BudgetService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<BudgetDetail> {
    const id = +route.paramMap.get('id');

    return forkJoin({
      budget: this.budgetService.getBudgetById(id).pipe(first()),
      movements: this.budgetService.getBudgetMovements(id).pipe(first()),
    });
  }
}
