import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'education',
        loadChildren: () => import('./modules/education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'finances',
        loadChildren: () => import('./modules/finances/finances.module').then(m => m.FinancesModule)
      },
      {
        path: 'health',
        loadChildren: () => import('./modules/health/health.module').then(m => m.HealthModule),
      },
      {
        path: '',
        redirectTo: 'finances'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
