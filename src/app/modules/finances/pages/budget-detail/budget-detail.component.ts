import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateTime, Interval } from 'luxon';
import { formatInterval } from 'core/utils';
import {
  Budget,
  BudgetDetail,
  GroupMovement,
  Movement,
} from 'modules/finances/types';
import {
  BudgetFormComponent,
  MovementFormComponent,
} from 'modules/finances/components';
import { BudgetService } from 'modules/finances/services';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget;
  movements: GroupMovement[];

  constructor(
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private budgetService: BudgetService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    const data: BudgetDetail = this.activatedRoute.snapshot.data.data;
    this.budget = data.budget;
    this.movements = data.movements;
    this.cd.detectChanges();
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

  updateBudget(): void {
    this.bottomSheet
      .open(BudgetFormComponent, {
        data: {
          action: 'update',
          budget: this.budget,
        },
      })
      .afterDismissed()
      .subscribe({
        next: (result: Budget | null) => {
          // Do nothing if result is null
          if (!result) {
            return;
          }

          // If category is different, then reload movements
          if (this.budget.category.id !== result.category.id) {
            this.budget = result;
            this.getBudgetMovements();
            return;
          }

          this.budget = result;
          this.cd.detectChanges();
        },
      });
  }

  getBudgetMovements(): void {
    const id = this.budget.id;

    this.budgetService.getBudgetMovements(id).subscribe({
      next: (movements) => {
        this.movements = movements;
        this.cd.detectChanges();
      },
    });
  }
}
