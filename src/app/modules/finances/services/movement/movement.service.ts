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
  private nextQuery = new Subject<MovementQuery>();

  constructor(private movementRepository: MovementRepository) {}

  create(movement: CreateMovement): Observable<any> {
    return this.movementRepository.create(movement);
  }

  update(id: number, movement: UpdateMovement): Observable<any> {
    return this.movementRepository.update(id, movement);
  }

  get movements(): Observable<GroupMovement[]> {
    return this.nextQuery.pipe(
      switchMap((query) => {
        return this.movementRepository.getAll(query);
      }),
    );
  }

  fetch(query: MovementQuery): void {
    this.nextQuery.next(query);
  }
}
