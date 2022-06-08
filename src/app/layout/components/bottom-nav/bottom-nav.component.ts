import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Submenu } from 'layout/types';
import { Events } from 'layout/constants';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-bottom-nav',
  host: {
    class: 'py-1.5 z-10 px-2 border border-t-neutral-200',
  },
  template: `
    <div class="h-full flex  w-full gap-2">
      <div
        class="flex-1 flex justify-center items-center"
        *ngFor="let item of submenu"
      >
        <button
          *ngIf="item.url"
          class="w-full text-gray-600"
          [routerLink]="item.url"
          routerLinkActive="!text-blue-500"
          (click)="submenuChanges.emit(item)"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
          <div class="text-xs tracking-tight">{{ item.title }}</div>
        </button>
        <button
          *ngIf="!item.url"
          class="bordered text-gray-600"
          (click)="dispatchAction(item)"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .bordered {
        @apply rounded-full w-10 h-10 border-solid border border-black flex justify-center items-center;
      }
    `,
  ],
})
export class BottomNavComponent {
  @Input() linkActiveClass = '!text-blue-500';
  @Input() submenu: Submenu[];
  @Output() submenuChanges = new EventEmitter<Submenu>();

  constructor(private emitter: EventEmitterService) {}

  dispatchAction(action: Submenu): void {
    this.emitter.emit(Events.BOTTOM_NAV_ACTION, action);
  }
}
