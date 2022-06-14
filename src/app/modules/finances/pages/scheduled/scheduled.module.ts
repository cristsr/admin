import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from 'layout/components';
import { ScheduledRoutingModule } from './scheduled-routing.module';
import { ScheduledComponent } from './scheduled.component';

@NgModule({
  declarations: [ScheduledComponent],
  imports: [CommonModule, ScheduledRoutingModule, ContentComponent],
})
export class ScheduledModule {}
