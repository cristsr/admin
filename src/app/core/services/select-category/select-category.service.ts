import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Store } from '../../classes/store.class';
import { Action } from '../../interfaces/Action';

export interface SelectCategoryState {
  isDisabled: boolean;
  category: null | boolean;
}

export type SelectCategoryAction = Action<SelectCategoryState>;

@Injectable({
  providedIn: 'root'
})
export class SelectCategoryService {

  store$ = new Store<SelectCategoryAction, SelectCategoryState>(
    {
      isDisabled: true,
      category: null,
    },
    SelectCategoryService.reducer
  );

  isActive$ = this.store$.state$.pipe(
    pluck('isDisabled')
  );

  subcategories$ = this.store$.state$.pipe(
    pluck('isDisabled')
  );

  constructor() {
    console.log('service created');
  }

  private static reducer(
    state: SelectCategoryState,
    action: SelectCategoryAction
  ): SelectCategoryState {
    switch (action.type) {
      case 'IS_ACTIVE': {
        return {
          ...state,
          isDisabled: action.payload
        };
      }
      case 'SELECT_CATEGORY': {
        return {
          ...state,
          category: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }

  isDisabled(isActive: boolean): void {
    this.store$.next({
      type: 'IS_ACTIVE',
      payload: isActive
    });
  }

  selectCategory(category): void {
    this.store$.next({
      type: 'SELECT_CATEGORY',
      payload: category
    });
  }
}
