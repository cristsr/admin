import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FlexModule } from '../../directives/flex/flex.module';
import { IconModule } from '../icon/icon.module';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { CardModule } from '../card/card.module';
import { ListModule } from '../list/list.module';



@NgModule({
  declarations: [SelectComponent, SelectCategoryComponent],
  exports: [
    SelectComponent,
    SelectCategoryComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    IconModule,
    CardModule,
    ListModule
  ]
})
export class SelectModule { }
