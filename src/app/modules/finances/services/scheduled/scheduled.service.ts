import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { ScheduledRepository } from 'modules/finances/repositories';
import {
  CreateScheduled,
  Scheduled,
  UpdateScheduled,
} from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class ScheduledService {
  #fetch = new Subject<void>();
  #average = new Subject<any>();

  constructor(private scheduledService: ScheduledRepository) {}

  next(): void {
    this.#fetch.next();
  }

  get scheduled(): Observable<Scheduled[]> {
    return this.#fetch.pipe(switchMap(() => this.fetchScheduled()));
  }

  get average(): Observable<any> {
    return this.#average.asObservable();
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
