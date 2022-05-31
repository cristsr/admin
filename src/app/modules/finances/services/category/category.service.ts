import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, Subject, switchMap } from 'rxjs';
import { Category, Subcategory } from 'modules/finances/types';
import { CategoryRepository } from 'modules/finances/repositories';
import { setArrayItems } from 'core/state';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  #category = new Subject<Category>();
  #categories = new BehaviorSubject<Category[]>(null);

  constructor(private categoryRepository: CategoryRepository) {}

  get categories(): Observable<Category[]> {
    if (!this.#categories.value) {
      return this.categoryRepository
        .getAll()
        .pipe(setArrayItems(this.#categories));
    }

    return this.#categories.asObservable();
  }

  get subcategories(): Observable<Subcategory[]> {
    return this.#category.pipe(
      filter((category) => !!category),
      switchMap(({ id }) => {
        return this.categoryRepository.getSubcategories(id);
      }),
    );
  }

  fetchSubcategories(category: Category): void {
    this.#category.next(category);
  }
}
