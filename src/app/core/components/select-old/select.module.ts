import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FlexModule } from 'core/directives/flex/flex.module';
import { IconModule } from '../icon/icon.module';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { CardModule } from '../card/card.module';
import { ListModule } from '../list/list.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [SelectComponent, SelectCategoryComponent],
  exports: [
    SelectComponent,
    SelectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FlexModule,
    IconModule,
    CardModule,
    ListModule,
    MatInputModule
  ]
})
export class SelectModule { }
