import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesComponent } from './finances.component';

const routes: Routes = [
  {
    path: '',
    component: FinancesComponent,
    children: [
      {
        path: 'summary',
        loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule)
      },
      {
        path: 'movements',
        loadChildren: () => import('./movements/movements.module').then(m => m.MovementsModule)
      },
      {
        path: 'budgets',
        loadChildren: () => import('./budgets/budgets.module').then(m => m.BudgetsModule)
      },
      {
        path: 'add-movement',
        loadChildren: () => import('./add-movement/add-movement.module').then(m => m.AddMovementModule)
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
