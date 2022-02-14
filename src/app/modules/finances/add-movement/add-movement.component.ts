import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { List, Sublist } from 'core/components/select';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {

  form = this.fb.group({
    date: [new Date(), Validators.required],
    description: [null, Validators.required],
    amount: [null, Validators.required],
    category: [null, Validators.required],
    test: [null, Validators.required],
  });

  categories: List;
  subcategories: Sublist;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data;
      console.log('List options', this.categories);
    });

    this.categoryService.subcategories$
      .pipe(
        map(v => v.map(({category, ...rest}) => ({
          ...rest,
          option: category,
        })))
      )
      .subscribe((data: any) => {
        this.subcategories = data;
        console.log('Sublist options', this.subcategories);
      });
  }

  onCategoryChanges(category: any): void {
    console.log('Category menuChange', category);
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
