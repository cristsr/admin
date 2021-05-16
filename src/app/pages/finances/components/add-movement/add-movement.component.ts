import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-add-movement',
  template: `
    <div appFlex column>
      <app-select-category
        [categories]="categories$">
      </app-select-category>
      <input class="control" type="text" placeholder="Descripción"/>
      <input class="control" type="number" pattern="[0-9]*" inputmode="number" placeholder="Monto"/>
    </div>
  `,
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {
  categories$ = this.categoryService.categories;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }
}
