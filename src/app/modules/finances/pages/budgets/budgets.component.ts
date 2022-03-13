import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BudgetFormComponent } from 'modules/finances/pages/budget-form';
import { BudgetService } from 'modules/finances/services';
import { Budget, Movement } from 'modules/finances/types';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BudgetDetailComponent } from 'modules/finances/pages/budget-detail/budget-detail.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit, OnDestroy {
  budgets: Budget[];
  movements: Movement[];

  private unsubscribeAll = new Subject<void>();

  constructor(
    private budgetService: BudgetService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  setupObservers(): void {
    this.budgetService.budgets$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((budgets: Budget[]) => {
        this.budgets = budgets;
      });
  }

  openBudgetForm(): void {
    this.bottomSheet.open(BudgetFormComponent);
  }

  calculatePercentage(budget: Budget): string {
    return ((budget.spent / budget.amount) * 100).toFixed(0);
  }

  openBudgetDetail(budget: Budget): void {
    forkJoin({
      budget: this.budgetService.getBudgetById(budget.id),
      movements: this.budgetService.getBudgetMovements(budget.id),
    })
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data: { budget: Budget; movements: Movement[] }) => {
        this.dialog.open(BudgetDetailComponent, {
          data: {
            budget: data.budget,
            movements: data.movements,
          },
          width: '100%',
          height: '100%',
          maxHeight: '60%',
          // panelClass: 'p-4',
          maxWidth: '600px',
        });
      });
  }
}
