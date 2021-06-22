import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrediosPageRoutingModule } from './predios-routing.module';

import { PrediosPage } from './predios.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrediosPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [PrediosPage]
})
export class PrediosPageModule {}
