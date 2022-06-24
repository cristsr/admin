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
    pathMatch: 'full',
    redirectTo: 'finances/summary',
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      initialData: AppResolver,
    },
    data: {
      layout: 'default',
    },
    children: [
      {
        path: 'finances',
        loadChildren: () =>
          import('./modules/finances/finances.module').then(
            (m) => m.FinancesModule,
          ),
      },
      {
        path: 'education',
        loadChildren: () =>
          import('./modules/education/education.module').then(
            (m) => m.EducationModule,
          ),
      },
      {
        path: 'health',
        loadChildren: () =>
          import('./modules/health/health.module').then((m) => m.HealthModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
