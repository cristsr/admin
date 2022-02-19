import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  host: {
    class: 'h-14 shadow-sm z-10',
  },
  template: `
    <div class="h-full flex justify-between items-center px-4">
      <div class="flex items-center">
        <button mat-icon-button (click)="menuToggle.emit()">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="pl-2 text-md font-medium">
          {{ title }}
        </div>
      </div>
      <button mat-icon-button (click)="notification.emit($event.target)">
        <mat-icon>notifications</mat-icon>
      </button>
    </div>
  `,
})
export class NavComponent {
  @Input() title: string;

  @Output() menuToggle = new EventEmitter();

  @Output() notification = new EventEmitter();
}
