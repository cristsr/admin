import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SummaryRepository } from 'modules/finances/repositories/summary/summary.repository';
import { Balance, Expense, Expenses, Movement } from 'modules/finances/types';
import { ColorsService } from 'core/services';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(
    private summaryRepository: SummaryRepository,
    private colorService: ColorsService,
  ) {}

  balance(): Observable<Balance> {
    return this.summaryRepository.balance();
  }

  expenses(): Observable<Expenses> {
    return this.summaryRepository.expenses().pipe(
      // Object to entries
      map(Object.entries),
      // Generate chart data
      map((expenses) => {
        return expenses.map<[string, Expense]>(([period, categoryExpenses]) => [
          period,
          {
            categoryExpenses,
            chart: categoryExpenses.reduce(
              (state, curr) => {
                state.series.push(curr.amount);
                state.labels.push(curr.name);
                state.colors.push(this.colorService.classToHex(curr.color));
                return state;
              },
              { series: [], labels: [], colors: [] },
            ),
          },
        ]);
      }),
      map(Object.fromEntries),
      tap((expenses) => console.log(expenses)),
    );
  }

  lastMovements(): Observable<Movement[]> {
    return this.summaryRepository.lastMovements();
  }
}
