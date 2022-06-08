import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import {
  CreateMovement,
  Movement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { MovementRepository } from 'modules/finances/repositories';
import { BudgetService } from 'modules/finances/services';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  #query = new Subject<MovementQuery>();

  constructor(
    private movementRepository: MovementRepository,
    private budgetService: BudgetService,
  ) {}

  get movements(): Observable<Movement[]> {
    return this.#query.pipe(switchMap((query) => this.fetchMovements(query)));
  }

  fetchMovements(query: MovementQuery): Observable<Movement[]> {
    return this.movementRepository.getAll(query);
  }

  create(movement: CreateMovement): Observable<Movement> {
    return this.movementRepository.create(movement).pipe(
      tap((movement) => {
        this.budgetService.patchBudget(movement);
      }),
    );
  }

  update(id: number, movement: UpdateMovement): Observable<Movement> {
    return this.movementRepository.update(id, movement).pipe(
      tap((movement) => {
        this.budgetService.patchBudget(movement);
      }),
    );
  }

  next(query: MovementQuery): void {
    this.#query.next(query);
  }
}
