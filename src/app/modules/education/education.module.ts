import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';


@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
  ],
})
export class EducationModule { }
