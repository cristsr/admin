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
import { Budget, BudgetDetail, Movement } from 'modules/finances/types';
import {
  BudgetFormComponent,
  MovementFormComponent,
} from 'modules/finances/components';
import { BudgetService } from 'modules/finances/services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget;
  movements: Movement[];

  constructor(
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private budgetService: BudgetService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
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
      next: (movements: Movement[]) => {
        this.movements = movements;
        this.cd.detectChanges();
      },
    });
  }

  deleteBudget(): void {
    this.dialog
      .open(BudgetDeleteDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!result) {
            return;
          }

          this.budgetService.remove(this.budget.id).subscribe({
            next: () => {
              this.router.navigate(['./finances/budgets']);
            },
          });
        },
      });
  }
}

@Component({
  selector: 'app-budget-delete-dialog',
  template: `
    <div class="pb-2">
      <h2>Eliminar presupuesto</h2>
      <span>Esta seguro que desea eliminar este presupuesto?</span>
    </div>
    <div class="flex gap-4">
      <button
        class="mt-2 w-full border border-neutral-500 p-2 rounded flex justify-center items-center text-neutral-500"
        mat-ripple
        (click)="close()"
      >
        <mat-icon matPrefix class="mr-1 material-icon-outlined">close</mat-icon>
        <span>Cancelar</span>
      </button>

      <button
        type="button"
        class="mt-2 w-full bg-red-500 p-2 rounded flex justify-center items-center text-white"
        mat-ripple
        (click)="delete()"
      >
        <mat-icon matPrefix class="mr-1">delete</mat-icon>
        <span>Eliminar</span>
      </button>
    </div>
  `,
})
export class BudgetDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}
