import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CategoryService, MovementService } from 'modules/finances/services';
import { Option } from 'core/components/select';
import { CreateMovement } from 'modules/finances/types';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {
  formGroup: FormGroup;
  categories: Option[];
  appearance: MatFormFieldAppearance = 'standard';

  @ViewChild('ngForm', { static: true }) ngForm: NgForm;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private movementService: MovementService,
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.categoryService.categories$
      .pipe(
        map<any[], Option[]>((categories) =>
          categories.map(({ subcategories, ...rest }) => ({
            ...rest,
            suboptions: subcategories,
          })),
        ),
      )
      .subscribe((data: Option[]) => {
        this.categories = data;
        console.log('List options', this.categories);
      });
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      type: ['egreso', Validators.required],
      date: [new Date(), Validators.required],
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Form', this.formGroup.value);

    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      return;
    }

    function dateUtc(date: Date): string {
      return new Date(
        date
          .toLocaleString('en-US', {
            timeZone: 'America/Bogota',
          })
          .split('GMT')[0] + ' UTC',
      ).toISOString();
    }

    const movement: CreateMovement = {
      date: dateUtc(this.formGroup.value.date),
      description: this.formGroup.value.description,
      amount: this.formGroup.value.amount,
      category: this.formGroup.value.category.id,
      subcategory: this.formGroup.value.category.suboption.id,
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
    this.formGroup.reset({
      date: new Date(),
      description: null,
      amount: null,
      category: null,
    });
  }
}
