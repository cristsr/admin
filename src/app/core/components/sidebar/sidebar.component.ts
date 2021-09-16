import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';
import { Menu } from '../../interfaces/menu';


@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="top-0 bottom-0 min-w-[280px] px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [class.hidden]="!showSidebar">

      <!-- header -->
      <div class="flex flex-col pt-14 items-center">
        <div class="h-24 w-24">
          <img
            class="object-cover border-none rounded-full w-full h-full"
            src="assets/img/profile.jpeg"
            alt="">
        </div>
        <div class="flex items-center flex-col pt-4">
          <div class="leading-normal font-medium">
            Cristian Puenguenan
          </div>
          <div class="leading-normal text-xs font-medium">
            styven21121@gmail.com
          </div>
        </div>
      </div>

      <!-- Menu -->
      <ul class="pt-6">
        <li *ngFor="let menuItem of menu; index as i">
          <div matRipple
            class="rounded-xl flex items-center py-3 my-2 text-gray-800"
            (click)="onLinkClick(menuItem)"
            [routerLink]="menuItem.url"
            routerLinkActive="active">
            <span class="pl-3 pr-4 material-icons-outlined">{{ menuItem.icon }}</span>
            <span class="text-base font-medium">{{ menuItem.title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- overlay -->
    <div
      *ngIf="isMobile && showSidebar"
      class="absolute top-0 bottom-0 left-0 right-0 bg-[#0009] opacity-75 absolute z-20"
      (click)="toggleSidebar()">
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /**
   * Menu configuration
   */
  @Input() menu: Menu[];

  @Output() selected = new EventEmitter();

  /**
   * Determinate if device is mobile or desktop
   */
  isMobile = window.innerWidth < 640;

  /**
   * Hide sidebar by default if is mobile
   * or show if is desktop
   */
  showSidebar = !this.isMobile;

  constructor() {}

  ngOnInit(): void {
    this.listenWindowResize();
  }

  listenWindowResize(): void {
    const stream = fromEvent(window, 'resize').pipe(
      debounceTime(50),
      pluck<Event, number>('target', 'innerWidth')
    );

    stream.subscribe((width: number) => {
      if (width < 640 && !this.isMobile) {
        this.isMobile = true;
        this.showSidebar = false;
        return;
      }

      if (width >= 640 && this.isMobile) {
        this.isMobile = false;
        this.showSidebar = true;
      }
    });
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  onLinkClick(e: any): void {
    // Hide sidebar if device is mobile
    this.selected.emit(e);

    if (this.isMobile) {
      this.showSidebar = false;
    }
  }
}
