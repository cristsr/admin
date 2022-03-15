import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { BottomNavComponent } from 'layout/components';

@NgModule({
  declarations: [BottomNavComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    MatRippleModule,
  ],
  exports: [BottomNavComponent],
})
export class BottomNavModule {}
