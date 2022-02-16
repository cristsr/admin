import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';
import { ProgressModule } from 'core/components/progress/progress.module';
import { ThousandSuffixesModule } from 'core/pipes/thousand-suffixes';

@NgModule({
  declarations: [BudgetsComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ProgressModule,
    ThousandSuffixesModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class BudgetsModule {}
