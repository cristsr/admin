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
import { Budget, BudgetAverage } from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsComponent implements OnInit, OnDestroy {
  average: BudgetAverage;
  budgets: Budget[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private budgetService: BudgetService,
    private bottomSheet: MatBottomSheet,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  setupObservers(): void {
    this.budgetService.budgets
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((budgets: Budget[]) => {
        console.log('budgets', budgets);
        this.budgets = budgets;
        this.cd.detectChanges();
      });

    this.budgetService.average.pipe(takeUntil(this.#unsubscribeAll)).subscribe({
      next: (data: BudgetAverage) => {
        console.log('average', data);
        this.average = data;
      },
    });
  }

  openBudgetForm(): void {
    this.bottomSheet.open(BudgetFormComponent);
  }
}
