import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from 'layout/components';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [NavComponent],
})
export class NavModule {}
