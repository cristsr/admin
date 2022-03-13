import { Component, Input } from '@angular/core';
import { MovementType } from 'modules/finances/types';

@Component({
  selector: 'app-movement-item',
  template: `
    <div mat-ripple class="flex justify-between items-center rounded-xl py-2">
      <div class="flex items-center">
        <div
          class="rounded-full w-8 h-8 flex justify-center items-center bg-{{
            color
          }}"
        >
          <mat-icon>{{ icon || 'category' }}</mat-icon>
        </div>

        <div class="pl-3 flex flex-col">
          <div class="text-sm font-medium">{{ description }}</div>
          <div class="text-xs">{{ category }}</div>
        </div>
      </div>
      <div class="text-sm font-medium" [class]="amountColor[type]">
        {{ '$' + (amount | number) }}
      </div>
    </div>
  `,
  styleUrls: ['./movement-item.component.scss'],
})
export class MovementItemComponent {
  @Input() color = 'amber-500';
  @Input() icon: string;
  @Input() description: string;
  @Input() category: string;
  @Input() amount: number;
  @Input() type: MovementType;

  amountColor = {
    income: 'text-green-500',
    expense: 'text-red-500',
  };
}
