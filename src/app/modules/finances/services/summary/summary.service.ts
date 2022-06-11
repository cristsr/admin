import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, Subject, switchMap } from 'rxjs';
import { SummaryRepository } from 'modules/finances/repositories';
import {
  Balance,
  Expense,
  Expenses,
  ExpensesRaw,
  Movement,
  Summary,
} from 'modules/finances/types';
import { ColorsService } from 'core/services';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  #fetch = new Subject<void>();

  constructor(
    private summaryRepository: SummaryRepository,
    private colorService: ColorsService,
  ) {}

  fetchSummary(): Observable<Summary> {
    console.log('[SummaryService] fetchSummary');
    return forkJoin({
      balance: this.balance(),
      movements: this.lastMovements(),
      expenses: this.expenses(),
    });
  }

  summary(): Observable<Summary> {
    return this.#fetch.pipe(switchMap(() => this.fetchSummary()));
  }

  next(): void {
    this.#fetch.next();
  }

  balance(): Observable<Balance> {
    return this.summaryRepository.balance();
  }

  expenses(): Observable<Expenses> {
    return this.summaryRepository
      .expenses()
      .pipe(map((expenses) => this.mapExpenses(expenses)));
  }

  lastMovements(): Observable<Movement[]> {
    return this.summaryRepository.lastMovements();
  }

  mapExpenses(expenses: ExpensesRaw): Expenses {
    // Array from expenses object
    const entries = Object.entries(expenses);

    const data: [string, Expense][] = entries.map(
      ([period, categoryExpenses]) => {
        // Generate chart data for each period
        const chart = categoryExpenses.reduce(
          // Reduce each categoryExpense
          (state, expense) => {
            state.series.push(expense.amount);
            state.labels.push(expense.category.name);
            state.colors.push(
              this.colorService.classToHex(expense.category.color),
            );
            return state;
          },
          // Initial state
          {
            series: [],
            labels: [],
            colors: [],
          },
        );

        return [
          period,
          {
            categoryExpenses,
            chart,
          },
        ];
      },
    );

    return <Expenses>Object.fromEntries(data);
  }
}
