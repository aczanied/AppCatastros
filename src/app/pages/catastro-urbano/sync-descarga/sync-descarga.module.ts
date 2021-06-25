import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncDescargaPageRoutingModule } from './sync-descarga-routing.module';

import { SyncDescargaPage } from './sync-descarga.page';
import { MenuPageModule } from '../../componentes/menu/menu.module';
import { ComponentsModule } from './../../../components/components.module';
// import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyncDescargaPageRoutingModule,
   // MenuPageModule
   ComponentsModule
  ],
  providers: [
   // ComponentesModule,
  ],
  declarations: [SyncDescargaPage]
})
export class SyncDescargaPageModule {}
