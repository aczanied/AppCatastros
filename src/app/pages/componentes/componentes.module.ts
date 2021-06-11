import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from './menu/menu.page';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuPage
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuPage
  ]
})

export class ComponentesModule { }
