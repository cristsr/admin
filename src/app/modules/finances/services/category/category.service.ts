import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  get categories$(): Observable<any[]> {
    const url = 'http://192.168.1.14:5000/api/v1/categories';
    return this.httpClient.get<any>(url);
  }
}
