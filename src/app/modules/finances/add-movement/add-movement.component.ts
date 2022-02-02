import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movement',
  templateUrl: 'add-movement.component.html',
  styleUrls: ['./add-movement.component.scss'],
})
export class AddMovementComponent implements OnInit {
  categories$ = this.categoryService.categories$;

  subcategories$ = this.categoryService.subcategories$;
  selectedCat: any;
  emailFormControl: any;

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  getDate: any = new Date();

  categories: any;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((data) => {
      this.categories = data.map(({name, ...rest}) => {
        return {
          ...rest,
          label: name,
        };
      });
    });
  }

  onCategoryChanges(category: any): void {
    console.log('Category menuChange', category);
  }

  currentDate(): string {
    return new Date().toISOString().substr(0, 10);
  }
}
