import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, Subject, switchMap } from 'rxjs';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import { Category, Subcategory } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl: string;
  private categoryChanges = new Subject<Category>();

  get categories$(): Observable<Category[]> {
    const url = this.apiUrl + 'categories';
    return this.httpClient.get<Category[]>(url);
  }

  get subcategories$(): Observable<Subcategory[]> {
    return this.categoryChanges.pipe(
      filter((category) => !!category),
      switchMap(({ id }) => {
        const url = this.apiUrl + 'categories/' + id + '/subcategories';
        return this.httpClient.get<Subcategory[]>(url);
      }),
    );
  }

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.get(ENV.FINANCES_API);
  }

  fetchSubcategories(category: Category): void {
    this.categoryChanges.next(category);
  }
}
