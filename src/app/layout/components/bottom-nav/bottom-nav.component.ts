import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventEmitter2 } from 'eventemitter2';
import { Submenu } from 'layout/types';
import { Events } from 'layout/constants';

@Component({
  selector: 'app-bottom-nav',
  host: {
    class: 'h-14 bg-white-200 shadow z-10 px-2',
  },
  template: `
    <div class="h-full flex w-full gap-2">
      <div
        class="flex-1 flex justify-center items-center"
        *ngFor="let item of submenu"
      >
        <button
          *ngIf="item.url"
          class="w-full"
          [routerLink]="item.url"
          [routerLinkActive]="linkActiveClass"
          (click)="submenuChanges.emit(item)"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
          <div class="text-xs tracking-tight">{{ item.title }}</div>
        </button>
        <button
          *ngIf="!item.url"
          class="bordered"
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
  @Input() linkActiveClass = 'text-blue-500';
  @Input() submenu: Submenu[];
  @Output() submenuChanges = new EventEmitter<Submenu>();

  constructor(private eventEmitter: EventEmitter2) {}

  dispatchAction(action: Submenu): void {
    this.eventEmitter.emit(Events.BOTTOM_NAV_ACTION, action);
  }
}
