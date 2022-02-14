import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  host: {
    class: 'flex',
  },
  template: `
    <mat-form-field appearance="legacy" floatLabel="always">
      <mat-label class="pointer-events-auto">Form field</mat-label>
      <mat-icon
        (click)="showCategories()"
        matPrefix
        class="text-purple-600 pointer-events-auto"
        >category</mat-icon
      >
      <div (click)="showCategories()">
        <input
          matInput
          readonly
          value=""
          class="pointer-events-none"
          placeholder="Ej: "
        />
      </div>
    </mat-form-field>
  `,
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  constructor() {}

  showCategories(): void {}
}
