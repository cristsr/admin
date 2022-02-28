import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovementComponent } from './add-movement.component';

const routes: Routes = [
  {
    path: '',
    component: AddMovementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMovementRoutingModule {}
