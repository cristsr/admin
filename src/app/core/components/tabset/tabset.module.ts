import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tab/tab.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TabsetComponent, TabComponent],
  imports: [CommonModule, MatIconModule],
  exports: [TabsetComponent, TabComponent],
})
export class TabsetModule {}
