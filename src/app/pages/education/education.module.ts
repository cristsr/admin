import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';
import { CardModule } from '../../core/ui/card/card.module';
import { DirectivesModule } from '../../core/directives/directives.module';


@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    CardModule,
    CardModule,
    DirectivesModule,
  ],
})
export class EducationModule { }
