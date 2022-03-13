import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupBy, GroupMovement, Movement } from 'modules/finances/types';

@Component({
  selector: 'app-movement-list',
  host: { class: 'flex flex-col gap-2' },
  template: `
    <div class="flex justify-between items-center">
      <div class="flex">
        <div class="flex items-center w-10">
          <span class="font-medium text-2xl">06</span>
        </div>
        <div class="flex flex-col">
          <span>domingo</span>
          <span class="text-gray-500">mar. 2022</span>
        </div>
      </div>
      <div class="flex items-center justify-center">
        $ {{ groupMovement.accumulated | number }}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <app-movement-item
        *ngFor="let movement of groupMovement.values; trackBy: trackByFn"
        (click)="onMovementItemClick(movement)"
        [color]="movement.category?.color"
        [icon]="movement.category?.icon"
        [description]="movement.description"
        [category]="movement.category?.name"
        [amount]="movement.amount"
        [type]="movement.type"
      >
      </app-movement-item>
    </div>
  `,
  styles: [],
})
export class MovementListComponent {
  @Input() period: GroupBy;
  @Input() groupMovement: GroupMovement;
  @Output() itemClick = new EventEmitter<Movement>();

  constructor() {}

  onMovementItemClick(movement: Movement): void {
    this.itemClick.emit(movement);
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
