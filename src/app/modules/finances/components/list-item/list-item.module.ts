import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from './list-item.component';
import { CapitalizeModule } from 'core/pipes/capitalize/capitalize.module';

@NgModule({
  declarations: [ListItemComponent],
  imports: [CommonModule, MatRippleModule, MatIconModule, CapitalizeModule],
  exports: [ListItemComponent],
})
export class ListItemModule {}
