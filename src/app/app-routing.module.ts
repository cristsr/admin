import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'layout/layout.component';
import { AuthGuard } from 'core/guards/auth/auth.guard';
import { AppResolver } from './app.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'finances/summary',
  },

  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch : 'full',
    redirectTo: 'finances/summary'
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      initialData: AppResolver
    },
    data: {
      layout: 'default'
    },
    children: [
      {
        path: 'finances',
        children: [
          {
            path: 'summary',
            loadChildren: () => import('./modules/finances/summary/summary.module').then(m => m.SummaryModule)
          },
          {
            path: 'movements',
            loadChildren: () => import('./modules/finances/movements/movements.module').then(m => m.MovementsModule)
          },
          {
            path: 'budgets',
            loadChildren: () => import('./modules/finances/budgets/budgets.module').then(m => m.BudgetsModule)
          },
          {
            path: 'add-movement',
            loadChildren: () => import('./modules/finances/add-movement/add-movement.module').then(m => m.AddMovementModule)
          },
        ],
      },
      {
        path: 'education',
        loadChildren: () => import('./modules/education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'health',
        loadChildren: () => import('./modules/health/health.module').then(m => m.HealthModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
