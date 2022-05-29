import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BudgetFormComponent } from 'modules/finances/components/budget-form';
import { BudgetService } from 'modules/finances/services';
import { Budget, Movement } from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsComponent implements OnInit, OnDestroy {
  budgets: Budget[];
  movements: Movement[];

  private unsubscribeAll = new Subject<void>();

  constructor(
    private budgetService: BudgetService,
    private bottomSheet: MatBottomSheet,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  setupObservers(): void {
    this.budgetService.budgets
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((budgets: Budget[]) => {
        console.log('budgets', budgets);
        this.budgets = budgets;
        this.cd.detectChanges();
      });
  }

  openBudgetForm(): void {
    this.bottomSheet.open(BudgetFormComponent);
  }

  calculatePercentage(budget: Budget): string {
    return ((budget.spent / budget.amount) * 100).toFixed(0);
  }
}
