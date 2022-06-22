import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { CustomDateAdapter } from 'core/utils';
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
    MatDialogModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class FinancesModule {}
