import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, withLatestFrom } from 'rxjs/operators';
import { Menu } from 'core/interfaces/menu';
import { SidebarService } from 'layout/services/sidebar.service';
import { WINDOW } from 'core/config';


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
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  panVelocity = 1;

  public percentage = 0;

  private sidebarPercentage = -100; // -100 - 0

  private viewFullSidebar = false;

  @Output() label = new EventEmitter<Record<any, any>>();

  /**
   * Menu configuration
   */

  get translateX(): string {
    return `translateX(${this.sidebarPercentage}%)`;
  }

  @Input() menu: Menu[];

  @Output() menuChange = new EventEmitter();

  /**
   * Determinate if device is mobile or desktop
   */
  isMobile = this.window.innerWidth < 640;

  /**
   * Hide sidebar by default if is mobile
   * or show if is desktop
   */
  showSidebar = !this.isMobile;

  setVelocity($event: any): void {
    console.log($event);
  }


  constructor(
    @Inject(WINDOW) private window: Window,
    private cd: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {
  }

  /**
   * Derecha
   * * 0 -> 100
   *
   * Izquierda
   * * 0 -> -100
   *
   * Derecha -> Izquierda
   * * 0 -> 100 -> 0 -> -100
   *
   * Izquierda -> Derecha
   * * 0 -> -100 -> 0 -> 100
   */

  ngOnInit(): void {

    this.sidebarService.panHorizontalStream.pipe(withLatestFrom(this.sidebarService.initialDirectionStream)).subscribe(
      ([event, initialDirection]) => {

        const percentage = this.normalizeDelta(event.deltaX);

        if (event.direction === Hammer.DIRECTION_RIGHT) {
          console.log('[RIGHT]', percentage);

          if (initialDirection === Hammer.DIRECTION_RIGHT) {
            if (this.viewFullSidebar) {
              console.log('return ');
              return;
            }
          }
        }

        this.percentage = percentage;

        if (event.direction === Hammer.DIRECTION_LEFT) {
          console.log('[LEFT]', percentage);
        }



        if (initialDirection === Hammer.DIRECTION_RIGHT) {
          this.sidebarPercentage = -100 + percentage;
          this.showSidebar = true;
          this.cd.markForCheck();

          if (percentage < 0) {
            this.resetSidebarPercentage();
            this.cd.markForCheck();

            this.label.emit({
              percentage,
              translateX: this.translateX
            });
            return;
          }
        }

        if (initialDirection === Hammer.DIRECTION_LEFT) {
          if (percentage > 0) {
            return;
          }
          this.sidebarPercentage = percentage;
        }

        this.cd.markForCheck();

        this.label.emit({
          percentage,
          translateX: this.translateX
        });
      }
    );

    this.sidebarService.panEndStream
      .pipe(withLatestFrom(this.sidebarService.initialDirectionStream))
      .subscribe({
        next: ([value, initialDirection]) => {
          console.log('[END]', this.percentage);

          if (initialDirection === Hammer.DIRECTION_RIGHT) {
            console.log('[INITIAL DIRECTION]', 'RIGHT');
            if (value.velocityX > 0.8 || this.percentage > 30) {
              this.fullSidebarPercentage();
            } else {
              if (!this.viewFullSidebar){
                this.resetSidebarPercentage();
              }
            }
          }

          if (initialDirection === Hammer.DIRECTION_LEFT) {
            console.log('[INITIAL DIRECTION]', 'LEFT');
            if (value.velocityX < -0.8 || this.percentage < -30) {
              this.resetSidebarPercentage();
            } else {
              if (this.showSidebar) {
                this.fullSidebarPercentage();
              }
            }
          }

          console.log('[VELOCITY]', value.velocityX);

          this.cd.markForCheck();
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

  normalizeDelta(delta: number): number {

    const reason = (delta / this.window.innerWidth) * this.panVelocity;

    if (reason > 1) {
      return 100;
    }

    if (reason < -1) {
      return -100;
    }

    return Math.floor(reason * 100);
  }

  resetSidebarPercentage(): void {
    this.sidebarPercentage = -100;
    this.showSidebar = false;
    this.viewFullSidebar = false;
  }

  fullSidebarPercentage(): void {
    this.sidebarPercentage = 0;
    this.showSidebar = true;
    this.viewFullSidebar = true;
  }
}
