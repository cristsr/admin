import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Period, Movement, MovementFilter } from 'modules/finances/types';
import { filter, merge, skipWhile, Subject, takeUntil } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementService } from 'modules/finances/services';
import {
  MovementFormComponent,
  MovementFilterComponent,
} from 'modules/finances/components';
import {
  plusMonths,
  plusDays,
  weekRange,
  plusYears,
  formatDay,
  formatMonth,
  formatYear,
  formatInterval,
} from 'core/utils';
import { capitalize, isEqual } from 'lodash-es';
import { NavService } from 'layout/services';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit, OnDestroy {
  movements: Movement[];
  period: Period = 'day';
  dateIndex = 0;
  date: string;
  dateLabel: string;
  filterOptions: MovementFilter;
  #unsubscribeAll = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private emitter: EventEmitterService,
    private navService: NavService,
    private movementService: MovementService,
  ) {}

  ngOnInit(): void {
    this.setupProperties();
    this.setupObservers();
    this.navService.nextConfig({
      buttons: [
        {
          tag: 'filter',
          icon: 'filter_list',
        },
      ],
    });

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
    // Remove buttons from nav
    this.navService.nextConfig({ buttons: [] });
  }

  setupProperties(): void {
    const { filterOptions, movements } = this.activatedRoute.snapshot.data.data;
    this.filterOptions = filterOptions;
    this.period = filterOptions.period;
    this.movements = movements;
    this.updateDate();
    this.cd.detectChanges();
  }

  setupObservers(): void {
    // Subscribe to movements
    this.movementService.movements
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: Movement[]) => {
          this.movements = data;
          this.cd.detectChanges();
        },
      });

    // Subscribe to movement events
    merge(
      this.emitter.on('movement:created'),
      this.emitter.on('movement:updated'),
    )
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: () => {
          this.updateDate();
          this.fetchMovements();
        },
      });

    // Subscribe to nav actions
    this.navService.action
      .pipe(
        takeUntil(this.#unsubscribeAll),
        filter((action) => action === 'filter'),
      )
      .subscribe({
        next: () => {
          this.showMovementFilter();
        },
      });
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
    });
  }

  showMovementFilter(): void {
    const config = {
      data: this.filterOptions,
      maxWidth: '100%',
      panelClass: ['!p-6', 'w-full'],
    };

    this.dialog
      .open(MovementFilterComponent, config)
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        skipWhile((data) => isEqual(data, this.filterOptions)),
      )
      .subscribe((data: MovementFilter) => {
        console.log('[MovementsComponent] filterOptions', data);
        this.dateIndex = 0;
        this.filterOptions = data;
        this.period = data.period;
        this.updateDate();
        this.fetchMovements();
      });
  }

  fetchMovements(): void {
    const type = Object.entries(this.filterOptions.type)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(',');

    this.movementService.next({
      ...this.filterOptions,
      date: this.date,
      type,
    });
  }

  onBefore(): void {
    this.dateIndex--;
    this.updateDate();
    this.fetchMovements();
  }

  onNext(): void {
    this.dateIndex++;
    this.updateDate();
    this.fetchMovements();
  }

  onReset(): void {
    if (this.dateIndex === 0) {
      return;
    }

    this.dateIndex = 0;
    this.updateDate();
    this.fetchMovements();
  }

  updateDate(): void {
    if (this.period === 'day') {
      const date = plusDays(this.dateIndex);
      this.dateLabel = formatDay(date);
      this.date = date.toISODate();
      return;
    }

    if (this.period === 'week') {
      const interval = weekRange(this.dateIndex);
      this.dateLabel = formatInterval(interval);
      this.date = interval.toISODate();
      return;
    }

    if (this.period === 'month') {
      const date = plusMonths(this.dateIndex);
      this.dateLabel = capitalize(formatMonth(date));
      this.date = date.toFormat('yyyy-MM');
      return;
    }

    if (this.period === 'year') {
      const date = plusYears(this.dateIndex);
      this.dateLabel = formatYear(date);
      this.date = date.toFormat('yyyy');
    }
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
