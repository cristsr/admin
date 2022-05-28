import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, MovementService } from 'modules/finances/services';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DateTime } from 'luxon';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {
  Category,
  Subcategory,
  Movement,
  UpdateMovement,
  CreateMovement,
  MovementFormData,
  MovementFormAction,
} from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss'],
})
export class MovementFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories: Category[];
  subcategories: Subcategory[];
  appearance: MatFormFieldAppearance;
  action: MovementFormAction;
  movement: Movement;
  formColor: 'red-400' | 'green-500' = 'red-400';
  tittle = {
    create: 'Agregar movimiento',
    edit: 'Editar movimiento',
    read: 'Detalle del movimiento',
  };

  private unsubscribeAll = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private movementService: MovementService,
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: MovementFormData,
  ) {
    this.action = data?.action || 'create';
    this.appearance = data?.appearance || 'standard';
    this.movement = data?.movement;
  }

  ngOnInit(): void {
    this.buildForm();
    this.setupObservers();
    this.setupForm();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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

  setupObservers(): void {
    this.categoryService.categories$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (data: Category[]) => {
          this.categories = data;
        },
      });

    this.categoryService.subcategories$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (data: Subcategory[]) => {
          this.subcategories = data;
          this.enableSubcategory();
        },
      });

    this.form
      .get('category')
      .valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (category: Category) => {
          this.categoryService.fetchSubcategories(category);
          this.resetSubcategory();
          this.disableSubcategory();
        },
      });

    // Type switch changes
    this.form
      .get('type')
      .valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (type: string) => {
          this.formColor = type === 'expense' ? 'red-400' : 'green-500';
        },
      });
  }

  setupForm(): void {
    if (this.action === 'read') {
      this.fillForm();
      this.form.disable({ emitEvent: false });
    }

    if (this.action === 'create') {
      this.disableSubcategory();
    }
  }

  fillForm(): void {
    if (this.movement) {
      this.form.patchValue({
        type: this.movement.type,
        date: DateTime.fromISO(this.movement.date).toJSDate(),
        description: this.movement.description,
        amount: this.movement.amount,
        category: this.movement.category,
        subcategory: this.movement.subcategory,
      });
    }
  }

  disableSubcategory(): void {
    this.form.get('subcategory').disable();
  }

  enableSubcategory(): void {
    if (this.action === 'read') {
      return;
    }
    this.form.get('subcategory').enable();
  }

  resetSubcategory(): void {
    if (this.action === 'read') {
      return;
    }
    this.form.get('subcategory').setValue(null);
  }

  onSubmit(): void {
    console.log('Form', this.form.value);

    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const { value } = this.form;

    const movement: CreateMovement | UpdateMovement = {
      date: DateTime.fromJSDate(value.date).toFormat('yyyy-MM-dd'),
      description: value.description,
      amount: value.amount,
      type: value.type,
      category: value.category?.id,
      subcategory: value.subcategory?.id,
    };

    console.log('Payload', movement);

    if (this.action === 'create') {
      this.createMovement(movement as CreateMovement);
    } else {
      this.updateMovement(movement as UpdateMovement);
    }
  }

  createMovement(movement: CreateMovement): void {
    this.movementService.create(movement).subscribe({
      next: () => {
        this.bottomSheetRef.dismiss();
      },
      error: (err) => {
        alert('Error al crear el movimiento');
        console.error(err);
      },
    });
  }

  updateMovement(movement: UpdateMovement): void {
    const id = this.movement.id;

    this.movementService.update(id, movement).subscribe({
      next: () => {
        this.bottomSheetRef.dismiss();
      },
      error: (err) => {
        alert('Error al actualizar el movimiento');
        console.error(err);
      },
    });
  }

  editMovement(): void {
    this.action = 'edit';
    this.form.enable({ emitEvent: false });
  }

  compare(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }
}
