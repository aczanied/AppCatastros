import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaBasicaPageRoutingModule } from './consulta-basica-routing.module';

import { ConsultaBasicaPage } from './consulta-basica.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaBasicaPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ConsultaBasicaPage]
})
export class ConsultaBasicaPageModule {}
