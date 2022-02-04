import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-select-category',
  template: `
    <div class="select-category" appFlex column>
      <ng-container *ngIf="!isActive">
        <div (click)="isActive = true" appFlex row align="center" class="control-group right-icon pointer">
          <input disabled type="text" class="control pointer" [class.subcategory]="subcategory" [placeholder]="subcategory?.name || 'Categoria'">
          <app-icon size="17px" icon="expand_more"></app-icon>
        </div>
      </ng-container>

      <ng-container *ngIf="isActive">
        <ng-container *ngIf="showCategories && !showSubcategories">
          <div appFlex row align="center" class="control-group left-icon right-icon">
            <app-icon size="17px" icon="search"></app-icon>
            <input
              class="control"
              [class.focus]="showCategories"
              type="text"
              placeholder="Buscar"
              (keyup)="onSearch($event.target)">
            <app-icon (click)="closeList()" size="17px" icon="expand_less"></app-icon>
          </div>
        </ng-container>

        <ng-container *ngIf="!showCategories && showSubcategories">
          <div (click)="displayCategories()" appFlex row align="center" class="control-group left-icon right-icon">
            <app-icon (click)="displayCategories()" size="17px" icon="chevron_left"></app-icon>
            <input
              type="text"
              class="control subcategory pointer"
              [class.focus]="showSubcategories"
              [placeholder]="subcategory?.name || 'Subcategoria'"
              disabled>
            <app-icon (click)="closeList()" size="17px" icon="expand_less"></app-icon>
          </div>
        </ng-container>

        <div appFlex column class="options">
          <ng-container *ngIf="showCategories && !showSubcategories && !search">
            <div
              appFlex row align="center"
              class="option-item"
              *ngFor="let category of categories"
              (click)="selectCategory(category)">
              <app-icon icon="done"></app-icon>
              <span>
                {{ category.name }}
              </span>
            </div>
          </ng-container>

          <ng-container *ngIf="showSubcategories || search">
            <div
              appFlex row align="center"
              class="option-item"
              *ngFor="let item of searchList"
              [class.active]="subcategory?.id === item.id"
              (click)="selectSubcategory(item)">
              <app-icon icon="done"></app-icon>
              <span>
                {{ item.name | lowercase}}
              </span>
            </div>
            <div class="option-item" *ngIf="!searchList.length">
              No hay resultados
            </div>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./select-category.component.scss'],
})
export class SelectCategoryComponent implements OnInit, OnChanges {
  @Input() readonly categories: any[];

  @Input() readonly subcategories: any[];

  @Input()
  set value(value: any) {
    this.subcategory = value;
  }

  @Output() changes = new EventEmitter();

  isActive = false;

  showCategories = true;

  subcategory: any;

  showSubcategories = false;

  searchList: any[];

  search = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeSearchList(changes);
  }

  initializeSearchList(changes: SimpleChanges): void {
    // when value is assigned synchronously
    if (changes.subcategories?.currentValue) {
      if (this.subcategory) {
        this.subcategoryWasAssigned();
      }
    }

    // when value is assigned asynchronously
    if (changes.value?.currentValue) {
      if (this.subcategories) {
        this.subcategoryWasAssigned();
      }
    }
  }

  selectCategory(category): void {
    this.searchList = this.subcategories
      .filter(v => v.categoryId === category.id);

    this.displaySubcategories();
  }

  selectSubcategory(subcategory: any): void {
    this.subcategory = subcategory;
    this.changes.emit(subcategory);
    this.closeList();
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
    this.search = false;

    if (this.subcategory) {
      this.subcategoryWasAssigned();
    } else {
      this.showCategories = true;
      this.showSubcategories = false;
    }
  }

  subcategoryWasAssigned(): void {
    this.showCategories = false;
    this.showSubcategories = true;
    this.searchList = this.subcategories
      .filter(v => v.categoryId === this.subcategory.categoryId);
  }

  onSearch(target: EventTarget): void {
    const needle = (target as HTMLInputElement).value.toLowerCase();

    if (needle.length < 3) {
      this.search = false;
      return;
    }

    if (!this.search) {
      this.search = true;
    }

    this.searchList = this.subcategories
      .filter(v => v.name.toLowerCase().includes(needle));
  }
}
