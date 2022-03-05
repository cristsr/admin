import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import {
  CreateMovement,
  GroupMovement,
  Movement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { Observable } from 'rxjs';
import { Pageable } from 'core/types';

@Injectable({
  providedIn: 'root',
})
export class MovementRepository {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.get(ENV.FINANCES_API) + 'movements/';
  }

  create(movement: CreateMovement): Observable<any> {
    return this.http.post(this.apiUrl, movement);
  }

  getAll(query: MovementQuery): Observable<Pageable<GroupMovement>> {
    return this.http.get<Pageable<GroupMovement>>(this.apiUrl + 'group-by', {
      params: { ...query },
    });
  }

  getOne(id: number): Observable<Movement> {
    return this.http.get<Movement>(this.apiUrl + id);
  }

  update(id: number, movement: UpdateMovement): Observable<Movement> {
    return this.http.put<Movement>(this.apiUrl + id, movement);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }
}
