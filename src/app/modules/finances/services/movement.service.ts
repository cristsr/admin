import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from 'environment';
import { ConfigService } from 'core/services/config';
import {
  CreateMovement,
  Movement,
  MovementParams,
  UpdateMovement,
} from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  create(movement: CreateMovement): Observable<any> {
    const url = this.config.get(ENV.FINANCES_API) + '/movements';
    return this.http.post(url, movement);
  }

  findAll(params: MovementParams): Observable<Movement[]> {
    const url = this.config.get(ENV.FINANCES_API) + '/movements';
    return this.http.get<Movement[]>(url, { params: { ...params } });
  }

  update(id: string, movement: UpdateMovement): Observable<Movement> {
    const url = this.config.get(ENV.FINANCES_API) + '/movements/' + id;
    return this.http.put<Movement>(url, movement);
  }
}
