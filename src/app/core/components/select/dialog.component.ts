import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectConfig, Option } from 'core/components/select/types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="flex flex-col">
      <span class="text-xl font-medium pb-4">Categorías</span>

      <mat-form-field *ngIf="enableSearch" class="w-full" appearance="fill" floatLabel="auto">
        <mat-label>Descripción</mat-label>
        <mat-icon matPrefix class="text-purple-600 mr-2">search</mat-icon>
        <input matInput [formControl]="searchControl">
        <button *ngIf="searchControl.value" matSuffix mat-icon-button aria-label="Clear" (click)="searchControl.reset()">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <div class="h-[240px] overflow-y-auto">
        <div class="flex flex-col gap-2">
          <app-list-option
            *ngFor="let option of list; trackBy: trackByFn"
            [id]="option.id"
            [color]="option.color"
            [icon]="option.icon"
            [label]="option.name"
            [selected]="option.id === value?.id"
            (click)="selectValue(option)">
          </app-list-option>

          <span *ngIf="!list?.length" class="text font-medium text-center">
            No se encontraron resultados
          </span>
        </div>
      </div>

      <div class="flex justify-end">
        <button mat-stroked-button class="h-10" color="primary" (click)="onAccept()">
          <mat-icon class="mr-1">done</mat-icon>
          <span>Aceptar</span>
        </button>
      </div>

    </div>
  `,
})
export class DialogComponent implements OnInit {
  public list: Option[];
  public value: Option;
  public enableSearch: boolean;
  public isSearching = false;
  public searchControl = new FormControl('', []);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private config: SelectConfig,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.list = this.config.list;
    this.value = this.config.value;
    this.enableSearch = this.config.enableSearch;
    this.searchControl.valueChanges.subscribe(value => this.onSearch(value));
  }

  selectValue(value: Option): void {
    this.value = value;
  }

  onSearch(value: string): void {
    this.isSearching = !!value;

    // reset list
    if (!this.isSearching) {
      this.list = this.config.list;
      return;
    }

    this.list = this.list.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  }

  onAccept(): void {
    this.dialogRef.close(this.value);
  }

  trackByFn(index: number, item: Option): string | number {
    return item.id || index;
  }

}
