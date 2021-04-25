import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '../card/card.module';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tab/tab.component';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    TabsetComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    IconModule
  ],
  exports: [
    TabsetComponent,
    TabComponent
  ],
})
export class TabsetModule { }
