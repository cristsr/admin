import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';
import { DirectivesModule } from '../../core/directives/directives.module';
import { CardModule } from '../../core/components/card/card.module';


@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    CardModule,
    DirectivesModule,
  ],
})
export class EducationModule { }
