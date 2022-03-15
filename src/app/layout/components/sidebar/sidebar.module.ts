import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SidebarComponent } from 'layout/components';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, MatRippleModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
