import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { diccionario, LocalData } from 'src/app/_models';
import { LocaldbService } from 'src/app/_services/helpers/localdb.service';

@Component({
  selector: 'app-decidir',
  templateUrl: './decidir.page.html',
  styleUrls: ['./decidir.page.scss'],
})
export class DecidirPage implements OnInit {

  // Variables
  private dbo: LocalData[] = diccionario;

  constructor( private navCtrl: NavController,
               private db: LocaldbService) { }

  ngOnInit() {
    this.db.iniciar();
    
  }

  public async irRural() {

   this.redireccionar('ContadorRural', '/inicio', '/sincronizar-descarga' );
  
  }

  public irUrbano() {

    this.redireccionar('ContadorUrbano', 'urbano/inicio', 'urbano/sync-descarga' );

  }


  private async redireccionar( opcion: string, rutaExito: string, rutaFallo: string) {
     // Validar que se encuentran descargados los datos de Rural
    // Y su bitacora de registro esta disponible
   const tabla = this.dbo.find(c => c._id === opcion).tablaBase;
   let data = await this.db.buscarPrimerElemento(tabla).then( data => { return data;});
   
   // De no encontrar la bitacora
   if (data === null) {
     // Descargamos los datos.
    this.navCtrl.navigateRoot([rutaFallo]);
    
   } else {
     // De lo contrario vamos a la pagina de Inicio
    this.navCtrl.navigateRoot([rutaExito]);
   }
  }

}
