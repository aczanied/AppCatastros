import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncCargaPageRoutingModule } from './sync-carga-routing.module';

import { SyncCargaPage } from './sync-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyncCargaPageRoutingModule
  ],
  declarations: [SyncCargaPage]
})
export class SyncCargaPageModule {}
