import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BottomNavComponent,
  ExampleSheetComponent,
} from './bottom-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [BottomNavComponent, ExampleSheetComponent],
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
