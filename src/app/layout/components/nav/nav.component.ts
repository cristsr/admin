import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavButtons, NavMainAction } from 'layout/types';

@Component({
  selector: 'app-nav',
  host: {
    class: 'h-14 shadow z-10',
  },
  template: `
    <div class="h-full flex justify-between items-center px-4">
      <div class="flex items-center items-center">
        <button mat-icon-button (click)="actionChanges.next(action)">
          <mat-icon>{{ icon }}</mat-icon>
        </button>
        <div class="pl-2 font-medium text-base">
          {{ title }}
        </div>
      </div>
      <div>
        <ng-container *ngFor="let action of buttons">
          <button mat-icon-button (click)="buttonChanges.next(action.tag)">
            <mat-icon>{{ action.icon }}</mat-icon>
          </button>
        </ng-container>
      </div>
    </div>
  `,
})
export class NavComponent {
  @Input() icon = 'menu';
  @Input() action: NavMainAction = 'toggle';
  @Input() title: string;
  @Input() buttons: NavButtons[];
  @Output() actionChanges = new EventEmitter<NavMainAction>();
  @Output() buttonChanges = new EventEmitter<string>();
}
