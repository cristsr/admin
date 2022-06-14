import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledComponent } from './scheduled.component';
import { ScheduledResolver } from 'modules/finances/pages/scheduled/scheduled.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      data: ScheduledResolver,
    },
    component: ScheduledComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduledRoutingModule {}
