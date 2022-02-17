import {
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
import { isHorizontal, Panable } from 'core/directives/pan';

@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="translate-x-[-100%] absolute top-0 bottom-0 left-0 px-8 bg-white h-screen z-30 flex flex-col shadow-sm w-[250px]"
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
      class="absolute top-0 bottom-0 left-0 right-0 bg-[#0009] opacity-75 absolute z-20"
      (click)="hideSidebar()"
    ></div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, Panable {
  showSidebar = false;
  isMobile: boolean;
  paning: boolean;
  previousDelta: number;
  private readonly panVelocity = 1.5;

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
  ) {}

  ngOnInit(): void {
    this.isMobile = this.window.innerWidth < 640;
    this.showSidebar = false;
    console.log(this.container);
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
  }

  onLinkClick(e: any): void {
    // Hide sidebar if device is mobile
    this.menuChange.emit(e);

    if (this.isMobile) {
      this.showSidebar = false;
    }
  }

  normalizeDelta(delta: number): number {
    const result = (delta / this.window.innerWidth) * this.panVelocity;
    return result * 100;
  }

  hideSidebar(): void {
    const interval = setInterval(() => {
      if (this.range === 0) {
        this.showSidebar = false;
        clearInterval(interval);
        return;
      }
      console.log('HIDE FULL', this.range);
      this.range -= 0.5;

      this.render();
    }, 1);
  }

  showFullSidebar(): void {
    this.range = 100;
    this.showSidebar = true;
  }

  onPanStart(event: any): void {
    if (isHorizontal(event.direction)) {
      this.paning = true;
      // this.showSidebar = true;
      console.log('START', event.deltaX);
    }
  }

  onPanRight(event: any): void {
    this.horizontalTranslation(event);
  }

  onPanLeft(event: any): void {
    this.horizontalTranslation(event);
  }

  onPanEnd(event: any): void {
    console.log('END', event.direction, this.range);

    this.paning = false;
    this.previousDelta = null;

    if (this.range > 20) {
      const interval = setInterval(() => {
        if (this.range === 100) {
          clearInterval(interval);
          return;
        }
        console.log('SHOW FULL', this.range);
        this.range += 0.5;

        this.render();
      }, 1);
    }

    if (this.range <= 20) {
      const interval = setInterval(() => {
        if (this.range === 0) {
          this.showSidebar = false;
          clearInterval(interval);
          return;
        }
        console.log('HIDE FULL', this.range);
        this.range -= 0.5;

        this.render();
      }, 1);
    }

    // tslint:disable-next-line:no-console
    console.time('start');
  }

  animateSidebar(): void {}

  private horizontalTranslation(event): void {
    if (!this.paning) {
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
    console.log(`[LEFT] `, delta);
  }

  render(): void {
    this.renderer.setStyle(
      this.container.nativeElement,
      'transform',
      `translateX(${-100 + this.range}%)`,
    );
  }
}
