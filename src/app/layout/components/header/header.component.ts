import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitterService } from 'core/services';
import { NavButton, NavMainAction } from 'layout/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  host: {
    class:
      'h-14 shadow z-10 fg-default text-default dark:border-b dark:border-b-neutral-800',
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
            <mat-icon class="material-icons-outlined">
              {{ button.icon }}
            </mat-icon>
          </button>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
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
      next: (type: NavMainAction) => {
        if (type === 'toggle') {
          this.action = 'toggle';
          this.icon = 'menu';
          this.cd.detectChanges();
          return;
        }

        if (type === 'back') {
          this.action = 'back';
          this.icon = 'arrow_back';
          this.cd.detectChanges();
          return;
        }

        this.action = 'close';
        this.icon = 'close';
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
