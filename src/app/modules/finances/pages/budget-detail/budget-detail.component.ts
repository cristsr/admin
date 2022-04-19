import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateTime, Interval } from 'luxon';
import { formatInterval } from 'core/utils';
import { Budget, GroupMovement, Movement } from 'modules/finances/types';
import { MovementFormComponent } from 'modules/finances/components';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget;
  movements: GroupMovement[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    const { budget, movements } = this.activatedRoute.snapshot.data.data;
    this.budget = budget;
    this.movements = movements;

    console.log(this.budget, this.movements);
  }

  formatInterval(): string {
    const start = DateTime.fromISO(this.budget.startDate);
    const end = DateTime.fromISO(this.budget.endDate);
    const interval = Interval.fromDateTimes(start, end);
    return formatInterval(interval);
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
    });
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
