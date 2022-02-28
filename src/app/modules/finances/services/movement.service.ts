import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap } from 'rxjs';
import { ENV } from 'environment';
import { ConfigService } from 'core/services/config';
import {
  CreateMovement,
  GroupMovement,
  Movement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { Pageable } from 'core/types';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private readonly apiUrl: string;
  private nextQuery = new Subject<MovementQuery>();

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.get(ENV.FINANCES_API) + 'movements/';
  }

  create(movement: CreateMovement): Observable<any> {
    return this.http.post(this.apiUrl, movement);
  }

  groupBy(): Observable<Pageable<GroupMovement>> {
    return this.nextQuery.pipe(
      switchMap((query) => {
        return this.http.get<Pageable<GroupMovement>>(
          this.apiUrl + 'group-by',
          {
            params: { ...query },
          },
        );
      }),
    );
  }

  getOne(id: string): Observable<Movement> {
    return this.http.get<Movement>(this.apiUrl + id);
  }

  update(id: string, movement: UpdateMovement): Observable<Movement> {
    return this.http.put<Movement>(this.apiUrl + id, movement);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  nextPage(query: MovementQuery): void {
    this.nextQuery.next(query);
  }
}
