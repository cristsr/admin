import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Menu } from 'core/interfaces/menu';
import { WINDOW } from 'core/config';
import { Panable } from 'core/directives';

@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="top-0 bottom-0 px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [ngStyle]="{ transform: translate }"
      [class.hidden]="!showSidebar"
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
  isMobile: boolean;
  showSidebar: boolean;
  private readonly panVelocity = 1.5;

  @Input() menu: Menu[];

  @Output() menuChange = new EventEmitter();

  @Output() label = new EventEmitter<Record<any, any>>();

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
  private _range: number;

  get translate(): string {
    return `translateX(${-100 + this.range}%)`;
  }

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    this.isMobile = this.window.innerWidth < 640;
    this.showSidebar = !this.isMobile;
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
    return +(result * 100).toFixed(0);
  }

  hideSidebar(): void {
    this.range = 0;
    this.showSidebar = false;
    // this.viewFullSidebar = false;
  }

  showFullSidebar(): void {
    this.range = 100;
    this.showSidebar = true;
  }

  onPanStart(event: any): void {
    console.log('START', event.deltaX);
  }

  onPanLeft(event: any): void {
    console.log('LEFT', event.deltaX);
  }

  onPanRight(event: any): void {
    console.log('RIGHT', event.deltaX);
  }

  onPanEnd(event: any): void {
    console.log('END', event.deltaX);
  }
}
