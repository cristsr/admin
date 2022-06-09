import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateTime, Interval } from 'luxon';
import { formatInterval } from 'core/utils';
import { Budget, BudgetDetail, Movement } from 'modules/finances/types';
import {
  BudgetFormComponent,
  MovementFormComponent,
} from 'modules/finances/components';
import { BudgetService } from 'modules/finances/services';
import { EventEmitterService } from 'core/services';
import { filter, first, merge, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailComponent implements OnInit, OnDestroy {
  budget: Budget;
  movements: Movement[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private emitter: EventEmitterService,
    private budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    this.setupProperties();
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
    this.emitter.emit('nav:buttons', []);
    this.emitter.emit('nav:main', 'toggle');
  }

  setupProperties(): void {
    const data: BudgetDetail = this.activatedRoute.snapshot.data.data;
    this.budget = data.budget;
    this.movements = data.movements;
    this.emitter.emit('nav:main', 'back');
    // Set nav buttons
    this.emitter.emit('nav:buttons', [
      {
        tag: 'delete',
        icon: 'remove_circle_outline',
      },
      {
        tag: 'update',
        icon: 'edit',
      },
    ]);
    this.cd.detectChanges();
  }

  setupObservers(): void {
    merge(
      this.emitter.on('movement:created'),
      this.emitter.on('movement:updated'),
    )
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: () => {
          this.getBudget();
          this.getBudgetMovements();
        },
      });

    // Subscribe to nav buttons clicks
    this.emitter
      .on('nav:button:click')
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (tag: string) => {
          if (tag === 'update') {
            this.updateBudget();
          }

          if (tag === 'delete') {
            this.deleteBudget();
          }
        },
      });

    // Back to budgets list
    this.emitter
      .on('nav:main:click')
      .pipe(
        takeUntil(this.#unsubscribeAll),
        filter((action) => action === 'back'),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['./finances/budgets']);
        },
      });
  }

  getBudget(): void {
    const id = this.budget.id;
    this.budgetService
      .getBudgetById(id)
      .pipe(first())
      .subscribe({
        next: (budget: Budget) => {
          this.budget = budget;
          this.cd.detectChanges();
        },
      });
  }

  getBudgetMovements(): void {
    const id = this.budget.id;
    this.budgetService
      .getBudgetMovements(id)
      .pipe(first())
      .subscribe({
        next: (movements: Movement[]) => {
          this.movements = movements;
          this.cd.detectChanges();
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
      .pipe(filter((result) => !!result))
      .subscribe({
        next: (result: Budget | null) => {
          // If category is different, then reload movements
          if (this.budget.category.id !== result.category.id) {
            this.budget = result;
            this.getBudgetMovements();
            return;
          }

          // If category is the same, then update budget
          this.budget = result;
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

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
    });
  }

  formatInterval(): string {
    const start = DateTime.fromISO(this.budget.startDate);
    const end = DateTime.fromISO(this.budget.endDate);
    const interval = Interval.fromDateTimes(start, end);
    return formatInterval(interval);
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
