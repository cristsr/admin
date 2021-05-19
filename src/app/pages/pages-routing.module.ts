import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'education',
        loadChildren: () => import('./education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'finances',
        loadChildren: () => import('./finances/finances.module').then(m => m.FinancesModule)
      },
      {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
      },
      {
        path: '',
        redirectTo: 'finances'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
