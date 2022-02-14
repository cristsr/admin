import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tab/tab.component';
import { IconModule } from '../icon/icon.module';
import { FlexModule } from 'core/directives/flex/flex.module';

@NgModule({
  declarations: [TabsetComponent, TabComponent],
  imports: [CommonModule, IconModule, FlexModule],
  exports: [TabsetComponent, TabComponent],
})
export class TabsetModule {}
