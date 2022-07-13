import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CategoryService } from 'modules/finances/services';
import { Category, MovementFilter } from 'modules/finances/types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movement-range',
  template: `
    <div class="flex flex-col p-2">
      <!--Title-->
      <div class="flex pb-4 items-center justify-between">
        <div class="flex items-center gap-2 text-default">
          <mat-icon class="material-icons-outlined">filter_list</mat-icon>
          <div class="text-xl font-medium">Filtrar</div>
        </div>
      </div>

      <form
        class="flex flex-col w-full gap-2"
        [formGroup]="form"
        (submit)="onSubmit()"
      >
        <!--Period-->
        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Periodo</mat-label>
          <mat-icon matPrefix color="primary" class="mr-2">repeat</mat-icon>
          <mat-select formControlName="period" [compareWith]="compare">
            <mat-select-trigger>
              {{ form.get('period').value.label | capitalize }}
            </mat-select-trigger>
            <mat-option *ngFor="let item of periods" [value]="item">
              {{ item.label | capitalize }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!--Category-->
        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Categoría</mat-label>
          <mat-icon matPrefix color="primary" class="mr-2">category</mat-icon>
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

        <!--Order-->
        <mat-form-field [appearance]="appearance" floatLabel="auto">
          <mat-label>Ordenar por</mat-label>
          <mat-icon matPrefix color="primary" class="mr-2">sort</mat-icon>
          <mat-select formControlName="order" [compareWith]="compare">
            <mat-select-trigger>
              {{ form.get('order').value?.label | capitalize }}
            </mat-select-trigger>
            <mat-option *ngFor="let item of order" [value]="item">
              {{ item.label | capitalize }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!--Movement type-->
        <div class="flex p-1.4 items-center" formGroupName="type">
          <mat-icon color="primary" class="mr-2">swap_vert</mat-icon>
          <div class="flex flex-col">
            <label class="pb-1 text-sm text-secondary">
              Tipo de movimiento
            </label>

            <div class="flex mt-2 gap-4">
              <mat-checkbox color="primary" formControlName="expense">
                Gastos
              </mat-checkbox>
              <mat-checkbox color="primary" formControlName="income">
                Ingresos
              </mat-checkbox>
            </div>
            <mat-error class="pt-1" *ngIf="form.get('type').invalid">
              Seleccione un valor
            </mat-error>
          </div>
        </div>

        <div class="flex gap-8 pt-4">
          <button
            mat-stroked-button
            type="button"
            class="w-full"
            (click)="closeDialog()"
          >
            <mat-icon matPrefix class="mr-1 text-default">close</mat-icon>
            <span class="text-default">Cancelar</span>
          </button>

          <button mat-flat-button color="primary" class="w-full">
            <mat-icon matPrefix class="mr-1">save</mat-icon>
            <span>Aplicar</span>
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementFilterComponent implements OnInit {
  categories: Category[];

  form: FormGroup;

  appearance: MatFormFieldAppearance = 'standard';

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

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    private data: MovementFilter,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupObservers();
    this.fillForm();
  }

  buildForm(): void {
    // Initialize form
    this.form = this.fb.group({
      period: [null],
      category: [{ id: null, name: 'Todas' }],
      order: [null],
      type: this.fb.group({
        expense: [null],
        income: [null],
      }),
    });
  }

  setupObservers(): void {
    // Load categories
    this.categoryService.categories.subscribe({
      next: (data: Category[]) => {
        this.categories = data;

        if (this.form.get('category').value) {
          return;
        }
        // Fill category
        this.form
          .get('category')
          .patchValue(data.find((v) => v.id === this.data.category));
      },
    });

    // Error handling
    this.form.get('type').valueChanges.subscribe({
      next: ({ income, expense }) => {
        // If none is selected, show error message
        if (!expense && !income) {
          this.form.get('type').setErrors({ required: true });
          return;
        }

        // Hide error message
        this.form.get('type').setErrors(null);
      },
    });
  }

  fillForm(): void {
    const { period, category, order, type } = this.data;

    this.form.patchValue({
      period: this.periods.find((v) => v.value === period),
      category: this.categories?.find((v) => v.id === category),
      order: this.order.find((v) => v.value === order),
      type: {
        income: type.income,
        expense: type.expense,
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const filterOptions: MovementFilter = {
      period: value.period.value,
      category: value.category?.id ?? null,
      order: value.order.value,
      type: value.type,
    };

    this.dialogRef.close(filterOptions);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}
