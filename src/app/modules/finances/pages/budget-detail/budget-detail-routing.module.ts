import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetDetailComponent } from './budget-detail.component';
import { BudgetDetailResolver } from 'modules/finances/pages/budget-detail/budget-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: BudgetDetailComponent,
    resolve: {
      data: BudgetDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetDetailRoutingModule {}
