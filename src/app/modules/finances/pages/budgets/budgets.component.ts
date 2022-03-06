import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BudgetFormComponent } from 'modules/finances/pages/budget-form';
import { BudgetService } from 'modules/finances/services';
import { Budget } from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit, OnDestroy {
  budgets: Budget[];

  private unsubscribeAll = new Subject<void>();

  constructor(
    private budgetService: BudgetService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  setupObservers(): void {
    this.budgetService.budget$
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
}
