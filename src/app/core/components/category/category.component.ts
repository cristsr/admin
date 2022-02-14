import { Component, ElementRef, Inject, Input, OnInit, Optional, Self } from '@angular/core';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Option } from 'core/components/select';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BaseInputComponent } from 'core/components/base-input/base-input.component';
import { Category, SubcategoriesQuery } from 'core/components/category/category.types';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category',
  template: `
    <input class="bg-transparent" readonly/>
  `,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CategoryComponent
    }
  ]
})
export class CategoryComponent extends BaseInputComponent
  implements OnInit, ControlValueAccessor, MatFormFieldControl<Option> {
  private static nextId = 0;

  @Input()
  get categories(): Observable<Category[]> {
    return this._categories;
  }
  set categories(categories: Observable<Category[]>) {
    this._categories = categories;
    this.stateChanges.next();
  }
  private _categories: Observable<Category[]>;

  @Input()
  get subcategoriesQuery(): SubcategoriesQuery {
    return this._subcategoriesQuery;
  }
  set subcategoriesQuery(subcategories: SubcategoriesQuery) {
    this._subcategoriesQuery = subcategories;
    this.stateChanges.next();
  }
  private _subcategoriesQuery: SubcategoriesQuery;

  @Input()
  set enableSearch(value: BooleanInput) {
    this._enableSearch = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _enableSearch = false;

  constructor(
    public defaultErrorStateMatcher: ErrorStateMatcher,

    @Optional()
    public parentForm: NgForm,

    @Optional()
    public parentFormGroup: FormGroupDirective,

    @Optional()
    @Self()
    public ngControl: NgControl,

    @Optional()
    @Inject(MAT_FORM_FIELD)
    public formField: MatFormField,

    public elementRef: ElementRef<HTMLElement>,
    private _dialog: MatDialog,
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl, formField, elementRef);

    this.setControlType('category');
    this.setId(CategoryComponent.nextId++);
  }

  ngOnInit(): void {
    console.log('[ngOnInit]');
    let id = 0;

    const interval = setInterval(() => {
      this.subcategoriesQuery(String(id++)).subscribe(v => console.log('subcategories', v));

      if (id > 10) {
        clearInterval(interval);
      }

    }, 1000);
  }

  onContainerClick(event: MouseEvent): void {
    console.log('onContainerClick');
  }

}
