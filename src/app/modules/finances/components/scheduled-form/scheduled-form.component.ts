import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Subject, takeUntil } from 'rxjs';
import {
  Category,
  CreateScheduled,
  Scheduled,
  ScheduledActions,
  ScheduledFormData,
  Subcategory,
  UpdateScheduled,
} from 'modules/finances/types';
import { CategoryService, ScheduledService } from 'modules/finances/services';
import { List } from 'core/types';

@Component({
  selector: 'app-scheduled-form',
  templateUrl: './scheduled-form.component.html',
  styleUrls: ['./scheduled-form.component.scss'],
})
export class ScheduledFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  action: ScheduledActions = 'create';
  appearance: MatFormFieldAppearance = 'standard';
  categories: Category[];
  subcategories: Subcategory[];
  scheduled: Scheduled;
  recurrent: List[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef,
    private router: Router,
    private categoryService: CategoryService,
    private scheduledService: ScheduledService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: ScheduledFormData | null,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.action = this.data.action;
      this.scheduled = this.data.scheduled;
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
      type: [null, Validators.required],
      name: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      subcategory: [null, Validators.required],
      date: [null, Validators.required],
      recurrent: [null, Validators.required],
    });
  }

  setupObservers(): void {
    this.categoryService.categories
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    this.scheduledService.recurrent
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: List[]) => {
          this.recurrent = data;
        },
      });
  }

  fillForm(): void {
    if (this.scheduled) {
      this.form.patchValue({
        name: this.scheduled.name,
        amount: this.scheduled.amount,
        category: this.scheduled.category,
      });
    }
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();

    if (!this.form.valid) {
      return;
    }

    const value = this.form.value;

    const payload = {
      name: value.name,
      amount: value.amount,
      recurrent: value.recurrent,
      type: value.type,
      date: '',
      category: value.category.id,
    };

    console.log('payload', payload);

    if (this.action === 'create') {
      this.create(<CreateScheduled>payload);
    }

    if (this.action === 'update') {
      this.update(<UpdateScheduled>payload);
    }
  }

  create(scheduled: CreateScheduled): void {
    this.scheduledService
      .create(scheduled)
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: () => {
          this.closeDialog();
        },
        error: (err) => {
          alert(err.message);
          console.log(err);
        },
      });
  }

  update(scheduled: UpdateScheduled): void {
    const id = this.scheduled.id;

    this.scheduledService.update(id, scheduled).subscribe({
      next: (result) => {
        console.log('updated scheduled result', result);
        this.closeDialog();
      },
      error: (err) => {
        alert(err.message);
        console.log(err);
      },
    });
  }

  closeDialog(): void {
    this.bottomSheetRef.dismiss();
  }

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}
