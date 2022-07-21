import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div
      mat-ripple
      class="flex justify-between items-center rounded-xl py-2 cursor-pointer"
    >
      <div class="flex items-center">
        <div
          class="rounded-full w-8 h-8 flex justify-center items-center bg-{{
            iconColor
          }}"
        >
          <mat-icon class="text-white"> {{ icon || 'category' }}</mat-icon>
        </div>

        <div class="pl-3 flex flex-col">
          <div class="text-sm font-medium">{{ title | capitalize }}</div>
          <div class="text-xs text-secondary">{{ subtitle | capitalize }}</div>
        </div>
      </div>
      <div class="text-sm font-medium text-{{ valueColor }}">
        {{ value }}
      </div>
    </div>
  `,
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input('icon-color') iconColor = 'amber-500';
  @Input() icon: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() value: string;
  @Input('value-color') valueColor: string;
}
