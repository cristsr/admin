import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { ScheduledRepository } from 'modules/finances/repositories';
import {
  CreateScheduled,
  Scheduled,
  ScheduledAverage,
  UpdateScheduled,
} from 'modules/finances/types';
import { List } from 'core/types';

@Injectable({
  providedIn: 'root',
})
export class ScheduledService {
  #fetch = new Subject<void>();
  #average = new Subject<any>();
  #recurrent: List[] = [
    {
      id: 0,
      label: 'Nunca',
      value: null,
    },
    {
      id: 1,
      label: 'día',
      value: 'day',
    },
    {
      id: 1,
      label: 'semana',
      value: 'week',
    },
    {
      id: 1,
      label: 'mes',
      value: 'month',
    },
    {
      id: 1,
      label: 'año',
      value: 'year',
    },
  ];

  constructor(private scheduledService: ScheduledRepository) {}

  get scheduled(): Observable<Scheduled[]> {
    return this.#fetch.pipe(switchMap(() => this.fetchScheduled()));
  }

  get average(): Observable<ScheduledAverage> {
    // return this.#average.asObservable();
    return of({}); // TODO
  }

  get recurrent(): Observable<List[]> {
    return of(this.#recurrent);
  }

  next(): void {
    this.#fetch.next();
  }

  fetchScheduled(): Observable<Scheduled[]> {
    return this.scheduledService.getAll();
  }

  create(budget: CreateScheduled): Observable<Scheduled> {
    return this.scheduledService.create(budget);
  }

  update(id: number, budget: UpdateScheduled): Observable<Scheduled> {
    return this.scheduledService.update(id, budget);
  }

  remove(id: number): Observable<number> {
    return this.scheduledService.remove(id);
  }

  getScheduledById(id: number): Observable<Scheduled> {
    return this.scheduledService.getOne(id);
  }

  private calculateAverage(budgets: any[]): void {
    const { total, spent } = budgets.reduce(
      (state, budget) => ({
        total: state.total + budget.amount,
        spent: state.spent + budget.spent,
      }),
      {
        total: 0,
        spent: 0,
      },
    );

    const percentage = Math.round((spent / total) * 100);

    this.#average.next({
      percentage,
      spent,
      total,
    });
  }
}
