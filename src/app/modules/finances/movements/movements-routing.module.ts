import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './movements.component';
import { MovementsResolver } from './movements.resolver';

const routes: Routes = [
  {
    path: '',
    component: MovementsComponent,
    resolve: {
      data: MovementsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
