import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancesComponent } from './finances.component';

const routes: Routes = [
  {
    path: '',
    component: FinancesComponent,
    children: [
      {
        path: 'summary',
        loadChildren: () =>
          import('./pages/summary/summary.module').then((m) => m.SummaryModule),
      },
      {
        path: 'movements',
        loadChildren: () =>
          import('./pages/movements/movements.module').then(
            (m) => m.MovementsModule,
          ),
      },
      {
        path: 'budgets',
        loadChildren: () =>
          import('./pages/budgets/budgets.module').then((m) => m.BudgetsModule),
      },
      {
        path: 'budgets/:id/details',
        loadChildren: () =>
          import('./pages/budget-detail/budget-detail.module').then(
            (m) => m.BudgetDetailModule,
          ),
      },
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancesRoutingModule {}
