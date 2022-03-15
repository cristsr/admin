import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from './finances.component';
import { FinancesRoutingModule } from './finances-routing.module';
import { MovementFormModule } from 'modules/finances/components/movement-form/movement-form.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

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
