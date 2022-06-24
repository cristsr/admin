import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './health.component';
import { ContentComponent } from 'layout/components';

@NgModule({
  declarations: [HealthComponent],
  imports: [CommonModule, HealthRoutingModule, ContentComponent],
})
export class HealthModule {}
