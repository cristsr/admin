import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Period, Movement, MovementFilter } from 'modules/finances/types';
import { filter, Subject, takeUntil } from 'rxjs';
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
import { EventEmitter2 } from 'eventemitter2';
import { Events } from 'layout/constants';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit, OnDestroy {
  movements: Movement[];
  period: Period = 'week';
  dateIndex = 0;
  date: string;
  dateLabel: string;

  filterOptions: MovementFilter = {
    period: 'week',
    order: 'date',
    type: 'income,expense',
  };

  private unsubscribeAll = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private movementService: MovementService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private navService: NavService,
    private eventEmitter: EventEmitter2,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
    this.fetchMovements();

    this.navService.nextConfig({
      buttons: [
        {
          tag: 'filter',
          icon: 'filter_list',
        },
      ],
    });

    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    // Remove buttons from nav
    this.navService.nextConfig({
      buttons: [],
    });
  }

  setupObservers(): void {
    this.movementService.movements
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: Movement[]) => {
          this.movements = response;
          this.changeDetectorRef.detectChanges();
          console.log(this.movements);
        },
      });

    this.navService.action
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter((action) => action === 'filter'),
      )
      .subscribe(() => {
        this.showMovementFilter();
      });

    this.eventEmitter.on(Events.BOTTOM_NAV_ACTION_DONE, () => {
      // If movement was created, fetch movements again
      this.fetchMovements();
    });
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet
      .open(MovementFormComponent, {
        data: {
          action: 'read',
          movement,
        },
      })
      .afterDismissed()
      .subscribe((result) => {
        // If movement was updated, fetch movements again
        if (result) {
          this.fetchMovements();
        }
      });
  }

  showMovementFilter(): void {
    this.dialog
      .open(MovementFilterComponent, {
        data: this.filterOptions,
        maxWidth: '100%',
        panelClass: ['!p-6', 'w-full'],
      })
      .afterClosed()
      .subscribe((filterOptions: MovementFilter) => {
        if (!filterOptions) {
          return;
        }

        if (isEqual(filterOptions, this.filterOptions)) {
          return;
        }

        this.filterOptions = filterOptions;

        console.log(this.filterOptions);

        if (!this.filterOptions.period) {
          return;
        }
        this.dateIndex = 0;
        this.period = this.filterOptions.period;
        this.fetchMovements();
        this.changeDetectorRef.detectChanges();
      });
  }

  fetchMovements(): void {
    this.updateDate();
    this.movementService.fetch({
      ...this.filterOptions,
      date: this.date,
    });
  }

  onBefore(): void {
    this.dateIndex--;
    this.fetchMovements();
  }

  onNext(): void {
    this.dateIndex++;
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
