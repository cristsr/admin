import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from './finances.component';
import { FinancesRoutingModule } from './finances-routing.module';
import { AddMovementModule } from 'modules/finances/pages/add-movement/add-movement.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [FinancesComponent],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    AddMovementModule,
    MatBottomSheetModule,
  ],
})
export class FinancesModule {}
