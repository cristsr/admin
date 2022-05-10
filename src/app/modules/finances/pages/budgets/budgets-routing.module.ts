import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './budgets.component';
import { BudgetsResolver } from './budgets.resolver';

const routes: Routes = [
  {
    path: '',
    component: BudgetsComponent,
    resolve: {
      data: BudgetsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
