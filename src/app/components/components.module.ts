import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { GestionCatastralComponent } from './catastro-urbano/gestion-catastral/gestion-catastral.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MenuComponent,
    GestionCatastralComponent,
    ExpandableComponent
  ],
  imports: [
    CommonModule,
    IonicModule, 
    IonicSelectableModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    GestionCatastralComponent
  ]
})
export class ComponentsModule { }
