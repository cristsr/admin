import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Submenu } from 'core/interfaces/menu';

@Component({
  selector: 'app-bottom-nav',
  host: {
    class: 'h-14 bg-white-200 shadow z-10 px-2',
  },
  template: `
    <div class="h-full flex w-full gap-2">
      <div
        class="flex-1 flex justify-center items-center"
        *ngFor="let item of config"
      >
        <button
          class="w-full"
          *ngIf="item.url"
          [routerLink]="item.url"
          [routerLinkActive]="linkActiveClass"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
          <div class="text-xs tracking-tight">{{ item.title }}</div>
        </button>
        <button *ngIf="!item.url" class="bordered" (click)="action.emit(item)">
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
  @Input() config: Submenu[];

  @Input() linkActiveClass: string;

  @Output() action = new EventEmitter();
}
