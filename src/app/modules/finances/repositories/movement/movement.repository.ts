import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import {
  CreateMovement,
  Movement,
  MovementQuery,
  UpdateMovement,
} from 'modules/finances/types';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementRepository {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.get(ENV.FINANCES_API) + 'movements/';
  }

  create(movement: CreateMovement): Observable<Movement> {
    return this.http.post<Movement>(this.apiUrl, movement);
  }

  getAll(query: MovementQuery): Observable<Movement[]> {
    const options = {
      params: { ...query },
    };

    return this.http
      .get<Movement[]>(this.apiUrl, options)
      .pipe(catchError(() => []));
  }

  getOne(id: number): Observable<Movement> {
    return this.http.get<Movement>(this.apiUrl + id);
  }

  update(id: number, movement: UpdateMovement): Observable<Movement> {
    return this.http.patch<Movement>(this.apiUrl + id, movement);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }
}
