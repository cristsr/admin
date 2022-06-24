import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'env';
import { Category, Subcategory } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepository {
  readonly #apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.#apiUrl = environment.financesApi + 'categories/';
  }

  create(category: Category): Observable<Category> {
    const url = this.#apiUrl;
    return this.httpClient.post<Category>(url, category);
  }

  getAll(): Observable<Category[]> {
    const url = this.#apiUrl;
    return this.httpClient.get<Category[]>(url);
  }

  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    const url = this.#apiUrl + categoryId + '/subcategories';
    return this.httpClient.get<Subcategory[]>(url);
  }
}
