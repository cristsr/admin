import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-nav',
  host: {
    class: 'flex h-12 justify-between items-center shadow-sm z-10 px-2'
  },
  template: `
    <div class="flex items-center">
      <button mat-icon-button (click)="menuToggle.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <div class="pl-2 text-md font-medium" (click)="changeTheme()">{{ title }}</div>
    </div>
    <button mat-icon-button (click)="notification.emit($event.target)">
      <mat-icon>notifications</mat-icon>
    </button>
  `,
})
export class NavComponent {
  @Input() title: string;

  @Output() menuToggle = new EventEmitter();

  @Output() notification = new EventEmitter();

  constructor(
    private themeService: ThemeService
  ) { }

  changeTheme(): void {
    // this.themeService.toggleTheme();
  }
}
