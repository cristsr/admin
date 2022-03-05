import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import {
  CreateMovement,
  GroupBy,
  GroupMovement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { Pageable } from 'core/types';
import { MovementRepository } from 'modules/finances/repositories';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private nextQuery = new Subject<MovementQuery>();
  private groupBy = new Subject<GroupBy>();

  constructor(private movementRepository: MovementRepository) {}

  create(movement: CreateMovement): Observable<any> {
    return this.movementRepository.create(movement);
  }

  update(id: number, movement: UpdateMovement): Observable<any> {
    return this.movementRepository.update(id, movement);
  }

  movements(): Observable<Pageable<GroupMovement>> {
    return this.nextQuery.pipe(
      switchMap((query) => {
        return this.movementRepository.getAll(query);
      }),
    );
  }

  nextPage(query: MovementQuery): void {
    this.nextQuery.next(query);
  }

  nextGroupBy(groupBy: GroupBy): void {
    this.groupBy.next(groupBy);
  }
}
