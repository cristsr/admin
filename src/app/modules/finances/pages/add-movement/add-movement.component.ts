import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CategoryService, MovementService } from 'modules/finances/services';
import { Category, CreateMovement, Subcategory } from 'modules/finances/types';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DateTime } from 'luxon';

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
      subcategory: value.category?.suboption.id,
    };

    this.movementService.create(movement).subscribe({
      next: () => {
        alert('Movimiento creado exitosamente!');
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

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }
}
