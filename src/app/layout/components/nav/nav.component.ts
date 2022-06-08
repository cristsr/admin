import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavButton, NavMainAction } from 'layout/types';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-nav',
  host: {
    class: 'h-14 shadow z-10',
  },
  template: `
    <div class="h-full flex justify-between items-center px-4">
      <div class="flex items-center items-center">
        <button mat-icon-button (click)="this.mainClick()">
          <mat-icon>{{ icon }}</mat-icon>
        </button>
        <div class="pl-2 font-medium text-base">
          {{ title }}
        </div>
      </div>
      <div>
        <ng-container *ngFor="let button of buttons">
          <button mat-icon-button (click)="buttonClick(button)">
            <mat-icon>{{ button.icon }}</mat-icon>
          </button>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  icon = 'menu';
  action: NavMainAction = 'toggle';
  title: string;
  buttons: NavButton[];

  constructor(
    private emitter: EventEmitterService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  setupObservers(): void {
    console.log('[NavComponent] setupObservers');

    this.emitter.on('nav:main').subscribe({
      next: ({ icon, action }) => {
        icon && (this.icon = icon);
        action && (this.action = action);
        this.cd.detectChanges();
      },
    });

    this.emitter.on('nav:main:reset').subscribe({
      next: () => {
        this.icon = 'menu';
        this.action = 'toggle';
        this.cd.detectChanges();
      },
    });

    this.emitter.on('nav:title').subscribe({
      next: (title: string) => {
        this.title = title;
        this.cd.detectChanges();
      },
    });

    this.emitter.on('nav:buttons').subscribe({
      next: (buttons: NavButton[]) => {
        this.buttons = buttons;
        this.cd.detectChanges();
      },
    });
  }

  mainClick(): void {
    this.emitter.emit('nav:main:click', this.action);
  }

  buttonClick(data: NavButton): void {
    this.emitter.emit('nav:button:click', data.tag);
  }
}
