import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, pluck } from 'rxjs/operators';
import { Menu } from 'core/interfaces/menu';
import { SidebarService } from 'layout/services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->


    <div
      class="top-0 bottom-0 px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [style.transform]="translateX"
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
      <div class="flex w-full justify-end">
        {{ percentage }}
        {{ translateX }}
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public percentage = 0;

  private direction: 'panleft' | 'panright'

  /**
   * Menu configuration
   */

  get translateX(): string {
    if (this.direction === 'panleft') {
      return `translateX(${this.percentage}%)`;
    } else {
      return `translateX(${-100 + (this.percentage)}%)`;
    }

  }

  @Input() menu: Menu[];

  @Output() menuChange = new EventEmitter();

  /**
   * Determinate if device is mobile or desktop
   */
  isMobile = window.innerWidth < 640;

  /**
   * Hide sidebar by default if is mobile
   * or show if is desktop
   */
  showSidebar = !this.isMobile;

  setVelocity($event: any): void {
    console.log($event);
  }


  constructor(
    private cd: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {
  }

  /**
   * 1. pan on screen 0 -> 100, 100 -> 0
   * 2. pan on screen 0 -> -100, -100 -> 0
   *
   */

  ngOnInit(): void {
    const horizontalEvent = () => filter(
      (e: any) => e.direction === 'panright' || e.direction === 'panleft'
    );

    this.sidebarService.panRight$
      // .pipe(horizontalEvent())
      .subscribe({
        next: (value: any) => {
          console.log('[RIGHT]');
          console.log(this.percentage, -100 + this.percentage);
          console.log(value.percentage);


          if (value.percentage < this.percentage) {
            return;
          }

          this.percentage = value.percentage;


          this.showSidebar = true;

          this.direction = value.direction;

        }
      });

    this.sidebarService.panLeft$
      .pipe()
      .subscribe({
        next: value => {
          console.log('[LEFT]');
          console.log(this.percentage);

          if (value.percentage > this.percentage) {
            return;
          }

          this.percentage = value.percentage;

          this.showSidebar = true;

          this.direction = value.direction;
        }
      });

    this.sidebarService.panEnd$
      .pipe(horizontalEvent())
      .subscribe({
        next: (value: any) => {
          console.log('[END]', value);

          this.direction = value.direction;

          if (value.velocityX > 0.5 || this.percentage > 30) {
            this.percentage = 100;
            this.showSidebar = true;
          } else {
            this.percentage = 0;
            this.showSidebar = false;
          }


          if (value.direction === 'panleft') {
            if (value.velocityX > 0.5 || this.percentage < -30) {
              this.percentage = 0;
              this.showSidebar = true;
            } else {
              this.percentage = -100;
              this.showSidebar = false;
            }
          }
        }
      });

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
    this.menuChange.emit(e);

    if (this.isMobile) {
      this.showSidebar = false;
    }
  }
}
