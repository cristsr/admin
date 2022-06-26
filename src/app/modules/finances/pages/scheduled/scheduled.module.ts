import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScheduledRoutingModule } from './scheduled-routing.module';
import { ScheduledComponent } from './scheduled.component';
import {
  ContentComponent,
  CardComponent,
  ListItemModule,
  ProgressModule,
} from 'core/components';

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
