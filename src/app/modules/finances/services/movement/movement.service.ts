import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import {
  CreateMovement,
  GroupMovement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { MovementRepository } from 'modules/finances/repositories';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  #query = new Subject<MovementQuery>();

  constructor(private movementRepository: MovementRepository) {}

  get movements(): Observable<GroupMovement[]> {
    return this.#query.pipe(
      switchMap((query) => {
        return this.movementRepository.getAll(query);
      }),
    );
  }

  create(movement: CreateMovement): Observable<any> {
    return this.movementRepository.create(movement);
  }

  update(id: number, movement: UpdateMovement): Observable<any> {
    return this.movementRepository.update(id, movement);
  }

  fetch(query: MovementQuery): void {
    this.#query.next(query);
  }
}
