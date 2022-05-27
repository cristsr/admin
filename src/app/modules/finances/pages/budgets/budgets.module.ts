import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressModule } from 'core/components';
import { BudgetFormModule } from 'modules/finances/components';
import { ThousandSuffixesModule } from 'core/pipes';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';

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
