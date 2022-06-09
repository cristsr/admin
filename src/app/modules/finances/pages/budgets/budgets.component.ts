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
import { Budget, BudgetAverage, Movement } from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';
import { EventEmitterService } from 'core/services';

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
    private bottomSheet: MatBottomSheet,
    private cd: ChangeDetectorRef,
    private emitter: EventEmitterService,
    private budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  setupObservers(): void {
    this.emitter
      .on('movement:created')
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: Movement) => {
          this.budgetService.patchBudget(data);
        },
      });

    this.budgetService.budgets
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((budgets: Budget[]) => {
        this.budgets = budgets;
        this.cd.detectChanges();
      });

    this.budgetService.average.pipe(takeUntil(this.#unsubscribeAll)).subscribe({
      next: (data: BudgetAverage) => {
        this.average = data;
        this.cd.detectChanges();
      },
    });
  }

  openBudgetForm(): void {
    this.bottomSheet.open(BudgetFormComponent);
  }
}
