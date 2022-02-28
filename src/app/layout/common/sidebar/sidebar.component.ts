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
import { Menu } from 'core/interfaces/menu';
import { WINDOW } from 'core/config';
import { isHorizontal, isNone, isRight, Panable } from 'core/directives/pan';
import { Subject, takeUntil } from 'rxjs';
import { translateAnimationFrame } from 'core/utils/utils';

@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="w-[250px] absolute top-0 bottom-0 left-0 px-8 bg-white h-screen z-[3000] flex flex-col shadow-sm"
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
      <ul class="pt-6">
        <li *ngFor="let menuItem of menu; index as i">
          <div
            matRipple
            class="rounded-xl flex items-center py-3 my-2 text-gray-800"
            (click)="onLinkClick(menuItem)"
            [routerLink]="menuItem.url"
            routerLinkActive="active"
          >
            <span class="pl-3 pr-4 material-icons-outlined">{{
              menuItem.icon
            }}</span>
            <span class="text-base font-medium">{{ menuItem.title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- overlay -->
    <div
      *ngIf="isMobile && showSidebar"
      class="absolute top-0 bottom-0 left-0 right-0 bg-[#0009] opacity-75 absolute z-[2000]"
      (click)="hideSidebar()"
    ></div>
  `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, Panable {
  showSidebar = false;
  isMobile: boolean;
  horizontalPaning: boolean;
  previousDelta: number;
  private panVelocity = 1.5;
  private cancelAnimations = new Subject<void>();

  @ViewChild('container', { static: true }) container: ElementRef;

  @Input() menu: Menu[];

  @Output() menuChange = new EventEmitter();

  get range(): number {
    return this._range;
  }
  set range(value: number) {
    if (value < 0) {
      this._range = 0;
    } else if (value > 100) {
      this._range = 100;
    } else {
      this._range = value;
    }
  }
  private _range = 0;

  constructor(
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isMobile = this.window.innerWidth < 640;
    this.showSidebar = false;
  }

  listenWindowResize(event): void {
    const width = event.target.innerWidth;

    if (width < 640 && !this.isMobile) {
      this.isMobile = true;
      this.showSidebar = false;
      return;
    }

    if (width >= 640 && this.isMobile) {
      this.isMobile = false;
      this.showSidebar = true;
    }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;

    if (this.showSidebar) {
      this.animateSidebar(0, 100);
    } else {
      this.hideSidebar();
    }
  }

  onLinkClick(e: any): void {
    // Hide sidebar if device is mobile
    this.menuChange.emit(e);

    if (this.isMobile) {
      this.hideSidebar();
    }
  }

  hideSidebar(): void {
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
    this.horizontalTranslation(event);
  }

  onPanDown(event: any): void {
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
      if (this.range < 70) {
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

    this.render();
  }

  normalizeDelta(delta: number): number {
    const result = (delta / this.window.innerWidth) * this.panVelocity;
    return result * 100;
  }

  animateSidebar(start: number, end: number, duration = 100): void {
    this.cancelAnimations.next();

    translateAnimationFrame(start, end, duration)
      .pipe(takeUntil(this.cancelAnimations))
      .subscribe((x) => this.handleTranslateAnimation(x));
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
