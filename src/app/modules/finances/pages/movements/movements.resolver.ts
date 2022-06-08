import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { isEmpty } from 'lodash-es';
import { plusDays, weekRange, plusMonths } from 'core/utils';
import { MovementFilter, MovementParams } from 'modules/finances/types';
import { MovementService } from 'modules/finances/services';

@Injectable({
  providedIn: 'root',
})
export class MovementsResolver implements Resolve<any> {
  constructor(private movementService: MovementService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    const queryParams = route.queryParams as MovementParams;
    // Default values
    let type = 'income,expense';
    const filterOptions: MovementFilter = {
      period: 'day',
      category: null,
      order: 'date',
      type: {
        income: true,
        expense: true,
      },
    };

    if (!isEmpty(queryParams)) {
      type = 'expense';
      filterOptions.period = queryParams.period;
      filterOptions.category = +queryParams.category;
      filterOptions.type.income = false;
    }

    return forkJoin({
      movements: this.movementService.fetchMovements({
        ...filterOptions,
        date: this.formatDate(filterOptions.period),
        type,
      }),
      filterOptions: of(filterOptions),
    });
  }

  formatDate(period: string): string {
    if (period === 'day') {
      const date = plusDays(0);
      return date.toISODate();
    }

    if (period === 'week') {
      const interval = weekRange(0);
      return interval.toISODate();
    }

    if (period === 'month') {
      const date = plusMonths(0);
      return date.toFormat('yyyy-MM');
    }
  }
}
