import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncCargaPage } from './sync-carga.page';

const routes: Routes = [
  {
    path: '',
    component: SyncCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncCargaPageRoutingModule {}
