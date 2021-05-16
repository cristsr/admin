import { Component, Input, OnInit } from '@angular/core';
import { SelectCategoryService } from '../../../services/select-category/select-category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-category',
  template: `
    <div class="select-category" appFlex column>
      <div *ngIf="!isActive" (click)="isActive = true">
        <fieldset disabled>
          <div appFlex row align="center" class="control right-icon pointer">
            <input type="text" class="pointer" [placeholder]="subcategory?.name || 'category'">
            <app-icon size="17px" icon="expand_more"></app-icon>
          </div>
        </fieldset>
      </div>

      <ng-container *ngIf="isActive">
        <ng-container *ngIf="showCategories && !showSubcategories">
          <div appFlex row align="center" class="control left-icon right-icon">
            <app-icon size="17px" icon="search"></app-icon>
            <input type="text" placeholder="Buscar" (keyup)="search($event.target)">
            <app-icon (click)="closeList()" size="17px" icon="expand_less"></app-icon>
          </div>

          <div appFlex column class="options">
            <div
              *ngFor="let item of categories | async"
              (click)="selectCategory(item)">
              {{ item.name }} cat
            </div>
          </div>
        </ng-container>

        <ng-container *ngIf="!showCategories || showSubcategories">
          <div appFlex row align="center" class="control left-icon right-icon">
            <app-icon (click)="displayCategories()" size="17px" icon="chevron_left"></app-icon>
            <input type="text" disabled [placeholder]="'subcategory subcat'">
            <app-icon (click)="closeList()" size="17px" icon="expand_less"></app-icon>
          </div>

          <div appFlex column class="options">
            <div
              *ngFor="let item of subcategories"
              (click)="selectSubcategory(item)">
              {{ item.name }}
            </div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./select-category.component.scss'],
  providers: [SelectCategoryService]
})
export class SelectCategoryComponent implements OnInit {
  @Input() categories: Observable<any[]>;

  isActive = false;

  showCategories = true;

  subcategories = [];

  subcategory: any;

  showSubcategories = false;

  ngOnInit(): void {
  }

  selectCategory(category): void {
    this.subcategories = category.subcategories;
    this.displaySubcategories();
  }

  selectSubcategory(subcategory: any): void {
    this.isActive = false;
    this.showCategories = true;
    this.subcategory = subcategory;
  }

  displayCategories(): void {
    this.showCategories = true;
    this.showSubcategories = false;
  }

  displaySubcategories(): void {
    this.showCategories = false;
    this.showSubcategories = true;
  }

  closeList(): void {
    this.isActive = false;
    if (this.subcategory) {
      this.showCategories = false;
      this.showSubcategories = true;
    } else {
      this.showCategories = true;
      this.showSubcategories = false;
    }
  }

  search(target: EventTarget): void {
    console.log((target as HTMLInputElement).value);
  }
}
