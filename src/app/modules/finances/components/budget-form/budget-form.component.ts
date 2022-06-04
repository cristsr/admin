import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
  Budget,
  BudgetActions,
  BudgetFormData,
  Category,
  CreateBudget,
  UpdateBudget,
} from 'modules/finances/types';
import { CategoryService } from 'modules/finances/services';
import { BudgetService } from 'modules/finances/services/budget/budget.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  action: BudgetActions = 'create';
  appearance: MatFormFieldAppearance = 'standard';
  categories: Category[];
  tittle = {
    create: 'Crear presupuesto',
    update: 'Editar presupuesto',
  };
  budget: Budget;
  #unsubscribeAll = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: BudgetFormData | null,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.action = this.data.action;
      this.budget = this.data.budget;
    }

    this.buildForm();
    this.setupObservers();
    this.fillForm();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      repeat: [true, Validators.required],
    });
  }

  setupObservers(): void {
    this.categoryService.categories
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  fillForm(): void {
    if (this.budget) {
      this.form.patchValue({
        name: this.budget.name,
        amount: this.budget.amount,
        category: this.budget.category,
        repeat: this.budget.repeat,
      });
    }
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();

    if (!this.form.valid) {
      return;
    }

    const { value } = this.form;

    const budget = {
      name: value.name,
      amount: value.amount,
      category: value.category.id,
      repeat: value.repeat,
    };

    if (this.action === 'create') {
      this.createBudget(budget);
    }

    if (this.action === 'update') {
      this.updateBudget(budget);
    }
    console.log('budget', budget);
  }

  createBudget(budget: CreateBudget): void {
    this.budgetService
      .create(budget)
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: () => {
          this.bottomSheetRef.dismiss();
        },
        error: (err) => {
          alert(err.message);
          console.log(err);
        },
      });
  }

  updateBudget(budget: UpdateBudget): void {
    const id = this.budget.id;

    this.budgetService.update(id, budget).subscribe({
      next: (result) => {
        console.log('updated budget result', result);
        this.bottomSheetRef.dismiss(result);
      },
      error: (err) => {
        alert(err.message);
        console.log(err);
      },
    });
  }

  deleteBudget(): void {
    this.dialog
      .open(BudgetDeleteDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!result) {
            return;
          }

          const id = this.budget.id;
          this.budgetService.remove(id).subscribe({
            next: () => {
              this.bottomSheetRef.dismiss();
              this.router.navigate(['./finances/budgets']);
            },
          });
        },
      });
  }

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}

@Component({
  selector: 'app-budget-delete-dialog',
  template: `
    <div class="pb-2">
      <h2>Eliminar presupuesto</h2>
      <span>Esta seguro que desea eliminar este presupuesto?</span>
    </div>
    <div class="flex gap-2 ">
      <button
        class="mt-2 w-full bg-gray-300 p-2 rounded-xl flex justify-center items-center text-white"
        mat-ripple
        (click)="close()"
      >
        <mat-icon matPrefix class="mr-2">close</mat-icon>
        <span class="mt-0.">Cancelar</span>
      </button>

      <button
        type="button"
        class="mt-2 w-full bg-red-500 p-2 rounded-xl flex justify-center items-center text-white"
        mat-ripple
        (click)="delete()"
      >
        <mat-icon matPrefix class="mr-2">delete</mat-icon>
        <span class="mt-0.5">Eliminar</span>
      </button>
    </div>
  `,
})
export class BudgetDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}
