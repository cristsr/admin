import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter, map, pairwise,
  pluck,
  switchMapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Menu } from 'core/interfaces/menu';
import { SidebarService } from 'layout/services/sidebar.service';
import { WINDOW } from 'core/config';
import { isHorizontal, isRight } from 'layout/utils';


@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->


    <div
      class="top-0 bottom-0 px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [ngStyle]="{'transform': translate$ | async}"
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
  panVelocity = 2;

  public percentage = 0;

  public sidebarPercentage = -100;

  private viewFullSidebar = false;

  // Range 0 - 100
  // O is closed
  // 100 is open
  private percentageSource = new BehaviorSubject<number>(0);

  @Output() label = new EventEmitter<Record<any, any>>();

  /**
   * Menu configuration
   */

  get translateX(): string {
    return `translateX(${this.sidebarPercentage}%)`;
  }

  get translate$(): Observable<string> {
    return this.percentageSource.pipe(
      map(percentage => `translateX(${-100 + percentage}%)`)
    );
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

  translateSubject = new Subject();

  constructor(
    @Inject(WINDOW) private window: Window,
    private cd: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {
  }

  ngOnInit(): void {
    const panHorizontalStart$ = this.sidebarService.panStart$.pipe(
      filter(({direction}) => isHorizontal(direction)),
      tap(({direction}) => console.warn('START DIRECTION', direction))
    );

    const panHorizontal$ = this.sidebarService.panHorizontal$;

    const changeDirection$ = panHorizontal$.pipe(
      pluck('direction'),
      distinctUntilChanged(),
      tap(direction => console.warn('DIRECTION CHANGE', direction)),
    );

    const differentialX$ = panHorizontal$.pipe(
      pluck('deltaX'),
      pairwise(),
      map(([prev, curr]) => this.normalizeDelta(Math.abs(prev - curr))),
      tap(e => console.log('DIFFERENTIAL', e)),
    );

    const source$ = panHorizontalStart$.pipe(
      switchMapTo(
        differentialX$.pipe(
          filter(() => {
            const {value} = this.percentageSource;
            return !(value < 0 || value > 100);
          }),
          withLatestFrom(changeDirection$),
          map(([diff, direction]) => ({direction, diff}))
        )
      ),
    );

    source$.subscribe(({diff, direction}) => {
      console.log('STREAM', diff, direction);

      const {value} = this.percentageSource;

      const result = isRight(direction)
        ? value + diff
        : value - diff;

      console.log('RESULT', result);

      if (result <= 0) {
        this.percentageSource.next(0);
        this.showSidebar = false;
        this.cd.markForCheck();
        return;
      }

      if (result >= 100) {
        this.percentageSource.next(100);
        this.showSidebar = true;
        this.cd.markForCheck();
        return;
      }

      this.percentageSource.next(result);
      this.showSidebar = true;
      this.cd.markForCheck();
    });


    this.sidebarService.panEnd$.subscribe({
      next: () => {

        // this.percentageSource.next(2);

        // if (panend.velocityX > 0.6 || this.percentage >= 50) {
        //   this.fullSidebarPercentage();
        // }else {
        //   this.resetSidebarPercentage();
        // }
        //
        // if (panend.velocityX < -0.6 || this.percentage < 50) {
        //   this.resetSidebarPercentage();
        // } else {
        //   this.fullSidebarPercentage();
        // }

        console.log('END');
        console.log('');

        this.cd.markForCheck();
      }
    });

    this.listenWindowResize();
  }

  listenWindowResize(): void {
    const stream = fromEvent(this.window, 'resize').pipe(
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

  /**
   * delta determine pixel movement since start event
   * @param delta: {number}
   */
  normalizeDelta(delta: number): number {
    const result = (delta / this.window.innerWidth) * this.panVelocity;
    return +(result * 100).toFixed(0);
  }

  resetSidebarPercentage(): void {
    this.percentage = 0;
    this.showSidebar = false;
    this.viewFullSidebar = false;
  }

  fullSidebarPercentage(): void {
    this.percentage = 100;
    this.showSidebar = true;
    this.viewFullSidebar = true;
  }
}
