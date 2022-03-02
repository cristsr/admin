import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, Subject, switchMap } from 'rxjs';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import { Category } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _nextSubcategory = new Subject<Category>();

  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  get categories$(): Observable<any[]> {
    const url = this.config.get(ENV.FINANCES_API) + 'categories';
    return this.httpClient.get<any>(url);
  }

  get subcategories$(): Observable<any[]> {
    return this._nextSubcategory.pipe(
      filter((category) => !!category),
      switchMap((category) => {
        const url =
          this.config.get(ENV.FINANCES_API) +
          'categories/' +
          category.id +
          '/subcategories';
        return this.httpClient.get<any>(url);
      }),
    );
  }

  fetchSubcategories(category: Category): void {
    this._nextSubcategory.next(category);
  }
}
