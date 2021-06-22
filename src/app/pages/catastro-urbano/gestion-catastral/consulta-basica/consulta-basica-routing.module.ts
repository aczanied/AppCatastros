import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaBasicaPage } from './consulta-basica.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaBasicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaBasicaPageRoutingModule {}
