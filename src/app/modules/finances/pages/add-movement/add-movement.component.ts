import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CategoryService, MovementService } from 'modules/finances/services';
import { Category, CreateMovement, Subcategory } from 'modules/finances/types';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DateTime } from 'luxon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-movement-dialog',
  template: `
    <div class="text-lg font-medium pb-4">Movimiento creado exitosamente</div>

    <div class="ml-auto">
      <button
        mat-button
        [mat-dialog-close]="true"
        cdkFocusInitial
        (click)="ref.close()"
      >
        Aceptar
      </button>
    </div>
  `,
})
export class AddMovementDialogComponent {
  constructor(public ref: MatDialogRef<any>) {}
}

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {
  form: FormGroup;
  categories: Category[];
  subcategories: any[];
  appearance: MatFormFieldAppearance = 'standard';

  @ViewChild('ngForm', { static: true }) ngForm: NgForm;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private movementService: MovementService,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.disableSubcategory();
    this.listenCategoryChanges();

    this.categoryService.categories$.subscribe((data: Category[]) => {
      this.categories = data;
      // console.log('Categories', this.categories);
    });

    this.categoryService.subcategories$.subscribe((data: Subcategory[]) => {
      this.subcategories = data;
      this.enableSubcategory();
      // console.log('Subcategories', this.subcategories);
    });

    this.form.valueChanges.subscribe((v) => {
      console.log('Form changes', v);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      type: ['expense', Validators.required],
      date: [new Date(), Validators.required],
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      subcategory: [null, Validators.required],
    });
  }

  listenCategoryChanges(): void {
    this.form.get('category').valueChanges.subscribe((category: Category) => {
      this.categoryService.fetchSubcategories(category);
      this.disableSubcategory();
      this.resetSubcategory();
    });
  }

  disableSubcategory(): void {
    this.form.get('subcategory').disable();
  }

  enableSubcategory(): void {
    this.form.get('subcategory').enable();
  }

  resetSubcategory(): void {
    this.form.get('subcategory').setValue(null);
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const { value } = this.form;

    const movement: CreateMovement = {
      date: DateTime.fromJSDate(value.date).toFormat('yyyy-MM-dd'),
      description: value.description,
      amount: value.amount,
      category: value.category?.id,
      subcategory: value.subcategory?.id,
    };

    this.movementService.create(movement).subscribe({
      next: () => {
        this.dialog
          .open(AddMovementDialogComponent)
          .afterClosed()
          .subscribe(() => {
            this.bottomSheetRef.dismiss();
          });
        this.resetForm();
      },
      error: (err) => {
        alert('Error al crear el movimiento');
        console.error(err);
      },
    });
  }

  resetForm(): void {
    this.ngForm.resetForm();
    this.form.reset({
      date: new Date(),
      description: null,
      amount: null,
      category: null,
    });
  }
}
