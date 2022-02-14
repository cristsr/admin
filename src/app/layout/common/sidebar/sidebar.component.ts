import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  pluck,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Menu } from 'core/interfaces/menu';
import { SidebarService } from 'layout/services/sidebar.service';
import { WINDOW } from 'core/config';
import { isHorizontal, isLeft, isNone, isRight } from 'layout/utils';

@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="top-0 bottom-0 px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [ngStyle]="{ transform: translate$ | async }"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @Input() menu: Menu[];

  @Output() menuChange = new EventEmitter();

  @Output() label = new EventEmitter<Record<any, any>>();

  private readonly panVelocity = 1.5;

  // Range 0 - 100
  private translate = new BehaviorSubject<number>(0);

  get translate$(): Observable<string> {
    return this.translate.pipe(
      map((percentage) => `translateX(${-100 + percentage}%)`),
    );
  }

  /**
   * Determinate if device is mobile or desktop
   */
  isMobile = this.window.innerWidth < 640;

  /**
   * Hide sidebar by default if is mobile
   * or show if is desktop
   */
  showSidebar = !this.isMobile;

  constructor(
    @Inject(WINDOW) private window: Window,
    private cd: ChangeDetectorRef,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    const panHorizontalStart$ = this.sidebarService.panStart$.pipe(
      filter(({ direction }) => isHorizontal(direction)),
      tap(({ direction }) => console.warn('START DIRECTION', direction)),
    );

    const panHorizontal$ = this.sidebarService.panHorizontal$;

    const changeDirection$ = panHorizontal$.pipe(
      pluck('direction'),
      distinctUntilChanged(),
      tap((direction) => console.warn('DIRECTION CHANGE', direction)),
    );

    const differentialX$ = panHorizontal$.pipe(
      pluck('deltaX'),
      pairwise(),
      map(([prev, curr]) => this.normalizeDelta(Math.abs(prev - curr))),
      tap((e) => console.log('DIFFERENTIAL', e)),
    );

    const source$ = panHorizontalStart$.pipe(
      switchMapTo(
        differentialX$.pipe(
          filter(() => {
            const { value } = this.translate;
            return !(value < 0 || value > 100);
          }),
          withLatestFrom(changeDirection$),
          map(([diff, direction]) => ({ direction, diff })),
        ),
      ),
      tap(() => console.log('START SOURCE EMMIT')),
      // map(({diff, direction}) => {
      // if ()
      // })
    );

    // @ts-ignore
    source$.subscribe(({ diff, direction }) => {
      console.log('STREAM', diff, direction);

      const { value } = this.translate;

      const result = isRight(direction) ? value + diff : value - diff;

      console.log('RESULT', result);

      if (result <= 0) {
        this.translate.next(0);
        this.showSidebar = false;
        this.cd.markForCheck();
        return;
      }

      if (result >= 100) {
        this.translate.next(100);
        this.showSidebar = true;
        this.cd.markForCheck();
        return;
      }

      this.translate.next(result);
      this.showSidebar = true;
      this.cd.markForCheck();
    });

    this.sidebarService.panEnd$.subscribe({
      next: (panend) => {
        const { value } = this.translate;
        const velocity = Math.abs(panend.velocity);

        if (isRight(panend.direction)) {
          if (velocity >= 0.6 || value >= 50) {
            console.log('RIGHT SHOW');
            this.showFullSidebar();
          } else {
            console.log('RIGHT HIDE');
            this.hideSidebar();
          }
        } else if (isLeft(panend.direction)) {
          if (panend.velocity >= 0.6 || value < 50) {
            console.log('LEFT HIDE');
            this.hideSidebar();
          } else {
            console.log('RIGHT SHOW');
            this.showFullSidebar();
          }
        } else if (isNone(panend.direction)) {
          if (value > 50) {
            console.log('NONE SHOW');
            this.showFullSidebar();
          } else {
            console.log('NONE HIDE');
            this.hideSidebar();
          }
        } else {
          console.warn('Direction not recognized');
        }

        console.log('END');
        console.log('');

        this.cd.markForCheck();
      },
    });

    this.listenWindowResize();
  }

  listenWindowResize(): void {
    const stream = fromEvent(this.window, 'resize').pipe(
      debounceTime(50),
      pluck<Event, number>('target', 'innerWidth'),
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

  hideSidebar(): void {
    this.translate.next(0);
    this.showSidebar = false;
    // this.viewFullSidebar = false;
  }

  showFullSidebar(): void {
    this.translate.next(100);
    this.showSidebar = true;
    // this.viewFullSidebar = true;
  }
}
