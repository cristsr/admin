import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-option',
  template: `
    <div
      matRipple
      class="flex justify-between items-center rounded-xl py-1.5 px-1"
    >
      <div class="flex items-center">
        <div
          class="rounded-full w-8 h-8 flex justify-center items-center {{
            color
          }}"
        >
          <mat-icon>{{ icon }}</mat-icon>
        </div>

        <div class="pl-3 flex flex-col">
          <div class="text-sm font-medium">{{ label }}</div>
        </div>
      </div>

      <div *ngIf="selected" class="w-8 h-8 flex justify-center items-center">
        <mat-icon>done</mat-icon>
      </div>
    </div>
  `,
})
export class ListOptionComponent {
  @Input() color: string;
  @Input() icon: string;
  @Input() label: string;
  @Input() selected: boolean;
}
