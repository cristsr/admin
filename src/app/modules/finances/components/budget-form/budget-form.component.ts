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
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  action: BudgetActions = 'create';
  appearance: MatFormFieldAppearance = 'outline';
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

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }

  closeDialog(): void {
    this.bottomSheetRef.dismiss();
  }
}
