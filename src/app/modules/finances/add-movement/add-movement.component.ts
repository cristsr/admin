import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { Option } from 'core/components/select';

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {
  form: FormGroup;

  categories: Option[];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      test: [null, Validators.required],
    });

    this.form.controls.amount.statusChanges.subscribe((v) => {
      console.log(v);
    });

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

  onSubmit(): void {
    this.form.markAllAsTouched();
    console.log('Form submit', this.form.status);
    console.log('Form submit', this.form.value);
  }

  reset(): void {
    this.form.reset();
  }
}
