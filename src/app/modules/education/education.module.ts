import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';
import { ContentComponent } from 'core/components';

@NgModule({
  declarations: [EducationComponent],
  imports: [CommonModule, EducationRoutingModule, ContentComponent],
})
export class EducationModule {}
