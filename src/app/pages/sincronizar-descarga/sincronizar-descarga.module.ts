import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SincronizarDescargaPageRoutingModule } from './sincronizar-descarga-routing.module';

import { SincronizarDescargaPage } from './sincronizar-descarga.page';
// import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SincronizarDescargaPageRoutingModule,
   // ComponentesModule
  ],
  declarations: [SincronizarDescargaPage]
})
export class SincronizarDescargaPageModule {}
