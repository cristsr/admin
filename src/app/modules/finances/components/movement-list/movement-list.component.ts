import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupMovement, Movement } from 'modules/finances/types';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-movement-list',
  host: { class: 'flex flex-col gap-2' },
  template: `
    <div class="flex justify-between items-center">
      <div class="flex">
        <div class="flex items-center w-10">
          <span class="font-medium text-2xl">{{ date.toFormat('dd') }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium">{{ date.weekdayLong | capitalize }}</span>
          <span class="text-gray-500">
            {{ date.monthShort | capitalize }} {{ date.year }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-center">
        {{ '$' + (groupMovement.accumulated | number) }}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <app-list-item
        *ngFor="let movement of groupMovement.values; trackBy: trackByFn"
        (click)="movementClick.emit(movement)"
        [icon]="movement.category?.icon"
        [icon-color]="movement.category?.color"
        [title]="movement.description"
        [subtitle]="movement.category?.name"
        [value]="'$' + (movement.amount | number)"
        [value-color]="movement.type === 'income' ? 'green-500' : 'red-500'"
      >
      </app-list-item>
    </div>
  `,
  styles: [],
})
export class MovementListComponent implements OnInit {
  @Input() groupMovement: GroupMovement;
  @Output() movementClick = new EventEmitter<Movement>();

  date: DateTime;

  ngOnInit(): void {
    this.date = DateTime.fromISO(this.groupMovement.date);
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
