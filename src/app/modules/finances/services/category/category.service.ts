import { Injectable } from '@angular/core';
import { filter, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { Category, Subcategory } from 'modules/finances/types';
import { CategoryRepository } from 'modules/finances/repositories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryChanges = new Subject<Category>();
  private categories: Observable<Category[]>;

  constructor(private categoryRepository: CategoryRepository) {}

  get categories$(): Observable<Category[]> {
    if (!this.categories) {
      this.categories = this.categoryRepository
        .getCategories()
        .pipe(shareReplay(1));
    }

    return this.categories;
  }

  get subcategories$(): Observable<Subcategory[]> {
    return this.categoryChanges.pipe(
      filter((category) => !!category),
      switchMap(({ id }) => {
        return this.categoryRepository.getSubcategories(id);
      }),
    );
  }

  fetchSubcategories(category: Category): void {
    this.categoryChanges.next(category);
  }
}
