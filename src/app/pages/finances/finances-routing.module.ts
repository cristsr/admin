import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesComponent } from './finances.component';
import { SummaryComponent } from './components/summary/summary.component';
import { MovementsComponent } from './components/movements/movements.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { AddMovementComponent } from './components/add-movement/add-movement.component';

const routes: Routes = [
  {
    path: '',
    component: FinancesComponent,
    children: [
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'movements',
        component: MovementsComponent
      },
      {
        path: 'budgets',
        component: BudgetsComponent
      },
      {
        path: 'add-movement',
        component: AddMovementComponent
      },
      {
        path: '',
        redirectTo: 'summary'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
