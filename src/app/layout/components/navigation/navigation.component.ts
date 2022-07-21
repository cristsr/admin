import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subject, takeUntil } from 'rxjs';
import { WINDOW } from 'core/constants';
import { isHorizontal, isNone, isRight, Panable } from 'core/directives/pan';
import { translateAnimationFrame } from 'core/utils';
import { Menu } from 'layout/types';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatRippleModule, MatIconModule],
  template: `
    <!-- Sidebar -->
    <div
      class="w-[280px] z-[3000] absolute top-0 bottom-0 left-0 px-8 h-screen flex flex-col shadow-sm fg-default text-default"
      [class.flex]="showSidebar"
      [class.hidden]="!showSidebar"
      #container
    >
      <!-- header -->
      <div class="flex flex-col pt-14 items-center">
        <div class="h-24 w-24">
          <img
            class="object-cover border-none rounded-full w-full h-full"
            src="assets/img/profile.jpeg"
            alt=""
          />
        </div>
        <div class="flex items-center flex-col pt-4">
          <div class="leading-normal font-medium">Cristian Puenguenan</div>
          <div class="leading-normal text-xs font-medium">
            styven21121@gmail.com
          </div>
        </div>
      </div>

      <!-- Menu -->
      <div class="pt-6 flex flex-col gap-4">
        <div
          *ngFor="let menuItem of menu; index as i"
          matRipple
          class="rounded-lg flex items-center py-2 px-4 cursor-pointer"
          (click)="onLinkClick(menuItem)"
          [routerLink]="menuItem.url"
          routerLinkActive="active"
        >
          <mat-icon class="material-icons-outlined text-primary">
            {{ menuItem.icon }}
          </mat-icon>
          <span class="pl-4 text-base font-medium">{{ menuItem.title }}</span>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      *ngIf="showSidebar"
      class="absolute top-0 bottom-0 left-0 right-0 h-screen bg-[#0009] z-[2000]"
      [style.opacity]="range / 100"
      (click)="hideSidebar()"
    ></div>
  `,
  styles: [
    `
      .active {
        @apply bg-primary text-white !important;
      }

      .active > mat-icon {
        color: white !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements Panable, OnInit {
  @ViewChild('container', { static: true }) container: ElementRef;
  @Input() menu: Menu[];
  @Output() menuChanges = new EventEmitter<Menu>();
  showSidebar = false;
  horizontalPaning: boolean;
  previousDelta: number;
  #panVelocity = 1.5;
  #isAnimating = false;

  get range(): number {
    return this.#range;
  }
  set range(value: number) {
    if (value < 0) {
      this.#range = 0;
    } else if (value > 100) {
      this.#range = 100;
    } else {
      this.#range = value;
    }
  }
  #range = 0;

  constructor(
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private emitter: EventEmitterService,
  ) {}

  ngOnInit(): void {
    this.emitter
      .on('nav:main:click')
      .pipe(filter((type) => type === 'toggle'))
      .subscribe(() => {
        this.toggleSidebar();
      });
  }

  onLinkClick(menu: Menu): void {
    this.menuChanges.next(menu);
    this.hideSidebar();
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;

    if (this.showSidebar) {
      this.animateSidebar(0, 100);
    } else {
      this.hideSidebar();
    }
  }

  hideSidebar(): void {
    if (this.#isAnimating) {
      return;
    }

    this.animateSidebar(100, 0);
  }

  onPanStart(event: any): void {
    if (isHorizontal(event.direction)) {
      this.horizontalPaning = true;
    }
  }

  onPanRight(event: any): void {
    this.horizontalTranslation(event);
  }

  onPanLeft(event: any): void {
    if (!this.showSidebar) {
      return;
    }

    this.horizontalTranslation(event);
  }

  onPanUp(event: any): void {
    if (!this.showSidebar) {
      return;
    }
    this.horizontalTranslation(event);
  }

  onPanDown(event: any): void {
    if (!this.showSidebar) {
      return;
    }
    this.horizontalTranslation(event);
  }

  onPanEnd(event: any): void {
    if (!this.showSidebar) {
      return;
    }

    let end: number;

    if (isNone(event.direction)) {
      if (this.range < 50) {
        end = 0;
      } else {
        end = 100;
      }
    } else if (isRight(event.direction)) {
      if (this.range < 20) {
        end = 0;
      } else {
        end = 100;
      }
    } else {
      if (this.range < 85) {
        end = 0;
      } else {
        end = 100;
      }
    }

    this.animateSidebar(this.range, end);
  }

  horizontalTranslation(event): void {
    if (!this.horizontalPaning) {
      return;
    }

    if (!this.previousDelta) {
      this.previousDelta = event.deltaX;
      return;
    }

    this.showSidebar = true;

    const delta = event.deltaX - this.previousDelta;

    this.range += this.normalizeDelta(delta);

    this.previousDelta = event.deltaX;

    if (isRight(event.direction)) {
      if (this.range < 5) {
        return;
      }
    }

    this.render();
  }

  normalizeDelta(delta: number): number {
    const result = (delta / this.window.innerWidth) * this.#panVelocity;
    return result * 100;
  }

  animateSidebar(start: number, end: number, duration = 200): void {
    this.#isAnimating = true;

    translateAnimationFrame(start, end, duration).subscribe({
      next: (x) => this.handleTranslateAnimation(x),
      complete: () => {
        this.#isAnimating = false;
      },
    });
  }

  handleTranslateAnimation(percentage: number): void {
    this.range = percentage;

    if (this.range === 0) {
      this.showSidebar = false;
    }

    if (this.range === 100) {
      this.showSidebar = true;
    }

    this.horizontalPaning = false;
    this.previousDelta = null;

    this.render();
  }

  render(): void {
    this.renderer.setStyle(
      this.container.nativeElement,
      'transform',
      `translateX(${-100 + this.range}%)`,
    );
    this.changeDetectorRef.detectChanges();
  }
}
