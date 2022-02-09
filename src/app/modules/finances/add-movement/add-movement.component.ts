import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Option } from 'core/components/select/types';

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {
  public readonly form = this.fb.group({
    date: [new Date(), Validators.required],
    description: [null, Validators.required],
    amount: [null, Validators.required],
    category: [null, Validators.required],
  });

  categories: Option[];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data.map(({subcategories, ...i}) => {
        return {
          ...i,
          options: subcategories
        };
      });

      console.log('List options', this.categories);
    });
  }

  onCategoryChanges(category: any): void {
    console.log('Category menuChange', category);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    console.log('Form submit', this.form.status);
  }

   reset(): void {
    this.form.reset();
   }


}
