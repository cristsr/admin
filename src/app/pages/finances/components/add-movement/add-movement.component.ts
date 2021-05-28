import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-add-movement',
  template: `
    <div appFlex column>
      <ng-container *ngIf="{
        categories: categories$ | async,
        subcategories: subcategories$ | async
      } as data">
        <app-select-category
          [categories]="data.categories"
          [subcategories]="data.subcategories"
          [value]="selectedCat"
          (changes)="onCategoryChanges($event)">
        </app-select-category>
      </ng-container>
      <input class="control" type="text" placeholder="Descripción"/>
      <input class="control" type="number" pattern="[0-9]*" inputmode="number" placeholder="Monto"/>
      <input class="control" type="date" [value]="currentDate()">
    </div>
    <div class="row j-center">
      <button>
        Agregar
      </button>
    </div>
  `,
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {
  // selectedCat = {categoryId: 1, name: 'RESTAURANTE'};

  categories$ = this.categoryService.categories$;

  subcategories$ = this.categoryService.subcategories$;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

  onCategoryChanges(category: any): void {
    console.log('Category selected', category);
  }

  currentDate(): string {
    return new Date().toISOString().substr(0, 10);
  }
}
