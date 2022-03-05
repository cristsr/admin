import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import { Category, Subcategory } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepository {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.get(ENV.FINANCES_API);
  }

  createCategory(category: Category): Observable<Category> {
    const url = this.apiUrl + '/categories';
    return this.httpClient.post<Category>(url, category);
  }

  getCategories(): Observable<Category[]> {
    const url = this.apiUrl + 'categories';
    return this.httpClient.get<Category[]>(url);
  }

  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    const url = this.apiUrl + 'categories/' + categoryId + '/subcategories';
    return this.httpClient.get<Subcategory[]>(url);
  }
}
