import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  get categories$(): Observable<any[]> {
    const url = this.config.get(ENV.FINANCES_API) + 'categories';
    return this.httpClient.get<any>(url);
  }
}
