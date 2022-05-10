import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementFormComponent } from './movement-form.component';

const routes: Routes = [
  {
    path: '',
    component: MovementFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementFormRoutingModule {}
