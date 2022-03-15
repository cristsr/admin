import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GroupBy, GroupMovement, Movement } from 'modules/finances/types';
import { filter, Subject, takeUntil } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementService } from 'modules/finances/services';
import {
  MovementFormComponent,
  MovementRangeComponent,
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
import { capitalize } from 'lodash-es';
import { NavService } from 'layout/services';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit, OnDestroy {
  movements: GroupMovement[];
  groupBy: GroupBy = 'month';
  dateIndex = 0;
  date: string;
  dateLabel: string;

  private unsubscribeAll = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private movementService: MovementService,
    private bottomSheet: MatBottomSheet,
    private navService: NavService,
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
        next: (response: GroupMovement[]) => {
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
      .subscribe({
        next: () => this.showMovementRange(),
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

  showMovementRange(): void {
    this.bottomSheet
      .open(MovementRangeComponent, {
        data: {
          selected: this.groupBy,
        },
        panelClass: '!p-0',
      })
      .afterDismissed()
      .subscribe((groupBy: GroupBy) => {
        this.dateIndex = 0;
        this.groupBy = groupBy;
        this.fetchMovements();
        this.changeDetectorRef.detectChanges();
      });
  }

  fetchMovements(): void {
    this.updateDate();
    this.movementService.fetch({
      date: this.date,
      groupBy: this.groupBy,
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
    if (this.groupBy === 'day') {
      const date = plusDays(this.dateIndex);
      this.dateLabel = formatDay(date);
      this.date = date.toISODate();
      return;
    }

    if (this.groupBy === 'week') {
      const interval = weekRange(this.dateIndex);
      this.dateLabel = formatInterval(interval);
      this.date = interval.toISODate();
      return;
    }

    if (this.groupBy === 'month') {
      const date = plusMonths(this.dateIndex);
      this.dateLabel = capitalize(formatMonth(date));
      this.date = date.toFormat('yyyy-MM');
      return;
    }

    if (this.groupBy === 'year') {
      const date = plusYears(this.dateIndex);
      this.dateLabel = formatYear(date);
      this.date = date.toFormat('yyyy');
    }
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
