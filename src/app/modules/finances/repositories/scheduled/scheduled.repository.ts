import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'env';
import {
  CreateScheduled,
  Scheduled,
  UpdateScheduled,
} from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class ScheduledRepository {
  readonly #apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.#apiUrl = environment.financesApi + 'scheduled/';
  }

  create(budget: CreateScheduled): Observable<Scheduled> {
    return this.httpClient.post<Scheduled>(this.#apiUrl, budget);
  }

  getAll(): Observable<Scheduled[]> {
    return this.httpClient.get<Scheduled[]>(this.#apiUrl);
  }

  getOne(id: number): Observable<Scheduled> {
    return this.httpClient.get<Scheduled>(this.#apiUrl + id);
  }

  update(id: number, budget: UpdateScheduled): Observable<Scheduled> {
    return this.httpClient.patch<Scheduled>(this.#apiUrl + id, budget);
  }

  remove(id: number): Observable<number> {
    return this.httpClient
      .delete<number>(this.#apiUrl + id)
      .pipe(map(() => id));
  }
}
