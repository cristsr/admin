import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CategoryService } from 'modules/finances/services';
import { Category, MovementFilter } from 'modules/finances/types';
import {
  combineLatest,
  distinctUntilChanged,
  ReplaySubject,
  Subject,
  take,
} from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-movement-range',
  template: `
    <div class="flex flex-col p-2">
      <div class="flex pb-4 items-center justify-between">
        <div class="flex items-center gap-2">
          <mat-icon class="material-icons-outlined">filter_list</mat-icon>
          <div class="text-xl font-medium">Filtrar</div>
        </div>
      </div>

      <form
        class="flex flex-col w-full gap-2"
        [formGroup]="form"
        (submit)="onSubmit()"
      >
        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Periodo</mat-label>
          <mat-icon matPrefix class="text-purple-600 mr-2">repeat</mat-icon>
          <mat-select formControlName="period" [compareWith]="compare">
            <mat-select-trigger>
              {{ form.get('period').value.label | capitalize }}
            </mat-select-trigger>
            <mat-option *ngFor="let item of periods" [value]="item">
              {{ item.label | capitalize }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Categoría</mat-label>
          <mat-icon matPrefix class="text-purple-600 mr-2">category</mat-icon>
          <mat-select formControlName="category" [compareWith]="compare">
            <mat-select-trigger>
              {{ form.get('category').value?.name | capitalize }}
            </mat-select-trigger>
            <mat-option [value]="{ id: null, name: 'Todas' }">Todas</mat-option>
            <mat-option *ngFor="let item of categories" [value]="item">
              <mat-icon matPrefix class="text-{{ item.color }}">
                {{ item.icon }}
              </mat-icon>
              {{ item.name | capitalize }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Ordenar por</mat-label>
          <mat-icon matPrefix class="text-purple-600 mr-2">sort</mat-icon>
          <mat-select formControlName="order" [compareWith]="compare">
            <mat-select-trigger>
              {{ form.get('order').value?.label | capitalize }}
            </mat-select-trigger>
            <mat-option *ngFor="let item of order" [value]="item">
              {{ item.label | capitalize }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="flex p-1.4 items-center">
          <mat-icon class="text-purple-600 mr-2">swap_vert</mat-icon>
          <div class="flex flex-col">
            <label class="pb-1 text-sm text-[rgba(0,0,0,.8)]">
              Tipo de movimiento
            </label>

            <div class="flex mt-2 gap-4">
              <mat-checkbox color="primary" formControlName="expense">
                Gasto
              </mat-checkbox>
              <mat-checkbox color="primary" formControlName="income">
                Ingreso
              </mat-checkbox>
            </div>
            <mat-error *ngIf="form.invalid">Seleccione un valor</mat-error>
          </div>
        </div>

        <button
          class="mt-2 w-full bg-purple-500 p-3 rounded-xl flex justify-center items-center text-white"
          mat-ripple
        >
          <mat-icon matPrefix class="mr-2">save</mat-icon>
          <span class="mt-0.5 font-bold ">Aplicar</span>
        </button>
      </form>
    </div>
  `,
})
export class MovementFilterComponent implements OnInit, OnDestroy {
  categories: Category[];

  periods = [
    {
      id: 1,
      label: 'Día',
      value: 'day',
      icon: 'today',
    },
    {
      id: 2,
      label: 'Semana',
      value: 'week',
      icon: 'date_range',
    },
    {
      id: 3,
      label: 'Mes',
      value: 'month',
      icon: 'calendar_month',
    },
    {
      id: 4,
      label: 'Año',
      value: 'year',
      icon: 'calendar_today',
    },
  ];

  order = [
    {
      id: 1,
      label: 'Fecha',
      value: 'date',
    },
    {
      id: 2,
      label: 'Monto',
      value: 'amount',
    },
  ];

  selected: string;
  form: FormGroup;
  appearance: MatFormFieldAppearance = 'standard';

  private categoriesLoaded = new ReplaySubject<void>(1);
  private unsubscribeAll = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,

    @Inject(MAT_DIALOG_DATA)
    private data: MovementFilter,
    private dialogRef: MatDialogRef<any>,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupObservers();
    this.fillForm();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  buildForm(): void {
    this.form = this.fb.group({
      period: [null],
      category: [{ id: null, name: 'Todas' }],
      order: [null],
      income: [true],
      expense: [true],
    });
  }

  fillForm(): void {
    const { period, category, order, type } = this.data;

    if (period) {
      const value = this.periods.find((v) => v.value === period);
      this.form.get('period').setValue(value);
    }

    if (category) {
      const fillCategory = (): void => {
        const value = this.categories.find((v) => v.id === category);
        this.form.get('category').setValue(value);
      };

      !!this.categories?.length
        ? fillCategory()
        : this.categoriesLoaded.pipe(take(1)).subscribe(fillCategory);
    }

    if (order) {
      const value = this.order.find((v) => v.value === order);
      this.form.get('order').setValue(value);
    }

    if (type) {
      this.form.get('expense').setValue(false);
      this.form.get('income').setValue(false);

      for (const value of type.split(',')) {
        this.form.get(value)?.setValue(true);
      }
    }
  }

  setupObservers(): void {
    // Load categories
    this.categoryService.categories$.pipe().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.categoriesLoaded.next();
        this.categoriesLoaded.complete();
      },
    });

    // Type validation
    combineLatest([
      this.form.controls.income.valueChanges,
      this.form.controls.expense.valueChanges,
    ])
      .pipe(distinctUntilChanged((a, b) => isEqual(a, b)))
      .subscribe({
        next: ([income, expense]) => {
          if (!income && !expense) {
            this.form.controls.income.setValidators([Validators.requiredTrue]);
            this.form.controls.expense.setValidators([Validators.requiredTrue]);
          } else {
            this.form.controls.income.clearValidators();
            this.form.controls.expense.clearValidators();
          }

          this.form.controls.income.updateValueAndValidity();
          this.form.controls.expense.updateValueAndValidity();
        },
      });
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const filterOptions: any = {};

    const { value } = this.form;

    filterOptions.period = value.period.value;

    if (value.category.id) {
      filterOptions.category = value.category.id;
    }

    filterOptions.order = value.order.value;

    const type = [];

    if (value.income) {
      type.push('income');
    }

    if (value.expense) {
      type.push('expense');
    }

    if (!!type.length) {
      filterOptions.type = type.join(',');
    }

    this.dialogRef.close(filterOptions as MovementFilter);
  }

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}
