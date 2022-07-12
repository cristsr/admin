import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Submenu } from 'layout/types';
import { Events } from 'layout/constants';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    MatRippleModule,
  ],
  host: {
    class:
      'py-1.5 px-2 z-10 border-t border-t-neutral-200 fg-light dark:bg-dark dark:text-white dark:border-t-gray-700',
  },
  template: `
    <div class="h-full flex  w-full gap-2">
      <div
        class="flex-1 flex justify-center items-center"
        *ngFor="let item of submenu"
      >
        <button
          *ngIf="item.url"
          class="w-full text-gray-600 dark:text-gray-200"
          [routerLink]="item.url"
          routerLinkActive="!text-primary"
          (click)="submenuChanges.emit(item)"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
          <div class="text-xs tracking-tight">{{ item.title }}</div>
        </button>

        <button
          *ngIf="!item.url"
          class="bordered text-primary"
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
        @apply rounded-full w-10 h-10 border-solid border border-primary flex justify-center items-center;
      }
    `,
  ],
})
export class BottomNavComponent {
  @Input() submenu: Submenu[];
  @Output() submenuChanges = new EventEmitter<Submenu>();

  constructor(private emitter: EventEmitterService) {}

  dispatchAction(action: Submenu): void {
    this.emitter.emit(Events.BOTTOM_NAV_ACTION, action.tag);
  }
}
