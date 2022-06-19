import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from 'layout/components';
import { ScheduledRoutingModule } from './scheduled-routing.module';
import { ScheduledComponent } from './scheduled.component';
import { CardComponent, ListItemModule, ProgressModule } from 'core/components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ScheduledComponent],
  imports: [
    CommonModule,
    ScheduledRoutingModule,
    MatIconModule,
    ProgressModule,
    MatButtonModule,
    ListItemModule,
    ContentComponent,
    CardComponent,
  ],
})
export class ScheduledModule {}
