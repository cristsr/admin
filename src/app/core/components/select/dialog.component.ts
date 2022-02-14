import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig, List, Option, Sublist, Suboption, Type } from './types';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="flex flex-col">
      <span class="text-xl font-medium pb-4">Categorías</span>

      <mat-form-field *ngIf="enableSearch" class="w-full" appearance="fill" floatLabel="auto">
        <mat-label>Descripción</mat-label>
        <mat-icon matPrefix class="text-purple-600 mr-2">search</mat-icon>
        <input matInput [formControl]="searchControl">
        <button *ngIf="isSearching" matSuffix mat-icon-button aria-label="Clear" (click)="searchControl.reset()">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <ng-container *ngIf="showSublistHeader">
        <div class="flex justify-between items-center rounded-xl py-1 mb-2 px-1 {{optionSelected.color}}">
          <div class="flex items-center">
            <div class="rounded-full w-8 h-8 flex justify-center items-center">
              <mat-icon>{{optionSelected.icon}}</mat-icon>
            </div>

            <div class="pl-3 flex flex-col">
              <div class="text-sm font-medium">{{optionSelected.name}}</div>
            </div>
          </div>

          <div matRipple (click)="showSublist = false" class="rounded-full w-8 h-8 flex justify-center items-center">
            <mat-icon>chevron_left</mat-icon>
          </div>
        </div>
      </ng-container>

      <div class="h-[240px] overflow-y-auto">
        <div *ngIf="!showSublist" class="flex flex-col gap-2">
          <app-list-option
            *ngFor="let option of list; trackBy: trackByFn"
            [id]="option.id"
            [color]="option.color"
            [icon]="option.icon"
            [label]="option.name"
            [selected]="option.id === value?.id"
            (click)="selectOption(option)">
          </app-list-option>

          <span *ngIf="!list?.length" class="text font-medium text-center">
            No se encontraron resultados
          </span>
        </div>

        <div *ngIf="showSublist" class="flex flex-col gap-2">
          <app-list-option
            *ngFor="let suboption of sublist!; trackBy: trackByFn"
            [id]="suboption.id"
            [color]="optionSelected.color"
            [icon]="optionSelected.icon"
            [label]="suboption.name"
            [selected]="suboption.id === value?.id"
            (click)="selectSuboption(suboption)">
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
  list: List;
  sublist: Sublist | null;
  type: Type;
  value: Option | Suboption | null;
  enableSearch: boolean;
  isSearching = false;
  optionSelected: Option | null;
  showSublist = false;
  searchControl = new FormControl('');

  get showSublistHeader(): boolean {
    return this.type === 'nested' && !!this.optionSelected && this.showSublist;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private config: DialogConfig,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.list = this.config.list;
    this.value = this.config.value;
    this.enableSearch = this.config.enableSearch;
    this.type = this.config.type;
    this.searchControl.valueChanges.subscribe(value => this.onSearch(value));
  }

  selectOption(value: Option): void {
    if (this.type === 'default') {
      this.value = value;
    } else {
      this.optionSelected = value;
      this.showSublist = true;
      this.sublist = this.config.sublist.filter(
        ({option}) => option === value.id
      );
    }
  }

  selectSuboption(suboption: Suboption): void {
    this.value = suboption;
  }

  onSearch(value: string): void {
    this.isSearching = !!value;

    // Reset search
    if (!this.isSearching) {
      this.resetSearch();
      return;
    }

    if (this.type === 'default') {
      this.list = this.config.list.filter(
        ({name}) => name.toLowerCase().includes(value.toLowerCase())
      );
    } else {

    }

    // reset list


    this.list = this.list.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  }

  resetSearch(): void {
    this.list = this.config.list;
    if (this.type === 'default') {

    } else {

    }
  }

  onAccept(): void {
    this.dialogRef.close(this.value);
  }

  trackByFn(index: number, item: Option): string | number {
    return item.id || index;
  }
}
