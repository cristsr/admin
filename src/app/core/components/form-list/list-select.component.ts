import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOption } from 'core/components/form-list/types';

@Component({
  selector: 'app-list-select',
  template: `
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-medium">Categorías</h2>

      <div class="h-[240px] py-2 overflow-y-auto ">
        <ul class="flex flex-col gap-2">
          <li matRipple
              class="flex justify-between items-center rounded-xl py-2 px-1"
              *ngFor="let option of list"
              (click)="selectValue(option)" [id]="option.id">

            <div class="flex items-center">
              <div class="rounded-full w-8 h-8 flex justify-center items-center bg-yellow-400 {{option.color}}">
                <mat-icon>{{option.icon}}</mat-icon>
              </div>

              <div class="pl-3 flex flex-col">
                <div class="text-sm font-medium">{{option.label}}</div>
              </div>
            </div>
            <div *ngIf="value?.id === option.id" class="flex justify-center items-center">
              <mat-icon>done</mat-icon>
            </div>
          </li>
        </ul>
      </div>


      <div class="flex justify-end pt-2">
        <button mat-stroked-button color="primary" (click)="onAccept()">
          <mat-icon class="mr-1">done</mat-icon>
          <span>Aceptar</span>
        </button>
      </div>

    </div>
  `,
  styles: [``]
})
export class ListSelectComponent implements OnInit {
  list: ListOption[];
  value: ListOption;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private config: any,
    private dialogRef: MatDialogRef<ListSelectComponent>,
  ) { }

  ngOnInit(): void {
    this.list = this.config.list;
    this.value = this.config.value;
  }

  selectValue(value: ListOption): void {
    this.value = value;
  }

  onAccept(): void {
    this.dialogRef.close(this.value);
  }
}
