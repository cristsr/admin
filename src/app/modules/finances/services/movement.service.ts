import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'core/services';
import { ENV } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  findAll(): Observable<any[]> {
    const url = this.config.get(ENV.FINANCES_API) + '/movements';
    return this.http.get<any>(url);
  }
}
