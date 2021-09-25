import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  template: `
    <div>Hola mundo</div>
  `
})
export class DialogDataComponent {}

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

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onCategoryChanges(category: any): void {
    console.log('Category menuChange', category);
  }

  currentDate(): string {
    return new Date().toISOString().substr(0, 10);
  }

  showCategories(): void {
    this.dialog.open(DialogDataComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
