import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTabsComponent } from './page-tabs.component';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PageTabsComponent],
  exports: [PageTabsComponent],
  imports: [CommonModule, IconModule, RouterModule, MatIconModule],
})
export class PageTabsModule {}
