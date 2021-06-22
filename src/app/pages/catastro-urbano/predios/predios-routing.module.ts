import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrediosPage } from './predios.page';

const routes: Routes = [
  {
    path: '',
    component: PrediosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrediosPageRoutingModule {}
