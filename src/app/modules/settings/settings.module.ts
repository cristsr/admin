import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ContentComponent, CardComponent } from 'core/components';
import { MatButtonModule } from '@angular/material/button';
import { CapitalizeModule } from 'core/pipes';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ContentComponent,
    CardComponent,
    MatButtonModule,
    CapitalizeModule,
  ],
})
export class SettingsModule {}
