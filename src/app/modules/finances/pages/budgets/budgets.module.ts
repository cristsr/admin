import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProgressModule } from 'core/components/progress/progress.module';
import { ThousandSuffixesModule } from 'core/pipes/thousand-suffixes';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';
import { BudgetFormModule } from 'modules/finances/components/budget-form';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BudgetsComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ProgressModule,
    ThousandSuffixesModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDialogModule,
    BudgetFormModule,
  ],
})
export class BudgetsModule {}
