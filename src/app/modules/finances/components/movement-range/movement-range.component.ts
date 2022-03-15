import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-movement-range',
  template: `
    <div class="flex flex-col divide-y">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <mat-icon class="material-icons-outlined">swap_vert</mat-icon>
          <div class="text-xl font-medium">Seleccionar rango de tiempo</div>
        </div>
      </div>

      <div class="flex flex-col w-full text-base pb-2">
        <div
          mat-ripple
          class="flex justify-between px-6 py-5"
          *ngFor="let item of config"
          (click)="dismiss(item.value)"
        >
          <div class="flex items-center">
            <mat-icon class="text-gray">{{ item.icon }}</mat-icon>
            <span class="pl-3">{{ item.label }}</span>
          </div>
          <mat-icon class="text-gray-800" *ngIf="selected !== item.value">
            radio_button_unchecked
          </mat-icon>

          <mat-icon class="text-gray-800" *ngIf="selected === item.value">
            radio_button_checked
          </mat-icon>
        </div>
      </div>
    </div>
  `,
})
export class MovementRangeComponent implements OnInit {
  config = [
    {
      label: 'Día',
      value: 'day',
      icon: 'today',
    },
    {
      label: 'Semana',
      value: 'week',
      icon: 'date_range',
    },
    {
      label: 'Mes',
      value: 'month',
      icon: 'calendar_month',
    },
    {
      label: 'Año',
      value: 'year',
      icon: 'calendar_today',
    },
  ];

  selected: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { selected: string },
    private bottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {
    const { selected } = this.data;
    this.selected = this.config.find((item) => item.value === selected)?.value;
  }

  dismiss(value: string): void {
    this.selected = value;
    this.bottomSheetRef.dismiss(value);
  }
}
