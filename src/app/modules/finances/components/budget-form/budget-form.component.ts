import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Category, CreateBudget } from 'modules/finances/types';
import { CategoryService } from 'modules/finances/services';
import { BudgetService } from 'modules/finances/services/budget/budget.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  action = 'create';
  categories: Category[];
  appearance: MatFormFieldAppearance = 'standard';
  tittle = {
    create: 'Crear presupuesto',
    edit: 'Editar presupuesto',
  };

  private unsubscribeAll = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private bottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    console.log('BudgetFormComponent destroyed');
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
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  editBudget(): void {}

  onSubmit(): void {
    this.form.updateValueAndValidity();

    if (!this.form.valid) {
      return;
    }

    const { value } = this.form;

    const budget: CreateBudget = {
      name: value.name,
      amount: value.amount,
      category: value.category.id,
      repeat: value.repeat,
    };

    console.log('budget', budget);

    this.createBudget(budget);
  }

  createBudget(budget: CreateBudget): void {
    this.budgetService
      .create(budget)
      .pipe(takeUntil(this.unsubscribeAll))
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

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}
