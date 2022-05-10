import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MovementFormModule } from 'modules/finances/components';
import { FinancesComponent } from './finances.component';
import { FinancesRoutingModule } from './finances-routing.module';

@NgModule({
  declarations: [FinancesComponent],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    MovementFormModule,
    MatBottomSheetModule,
  ],
})
export class FinancesModule {}
