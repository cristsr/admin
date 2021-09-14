import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from './bottom-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BottomNavComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    BottomNavComponent
  ]
})
export class BottomNavModule { }
