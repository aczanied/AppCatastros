import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SincronizarDescargaPage } from './sincronizar-descarga.page';

const routes: Routes = [
  {
    path: '',
    component: SincronizarDescargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SincronizarDescargaPageRoutingModule {}
