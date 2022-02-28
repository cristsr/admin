import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary.component';
import { SummaryResolver } from './summary.resolver';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    resolve: {
      data: SummaryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryRoutingModule {}
