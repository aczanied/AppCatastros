import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor( private router: Router, 
               private db: LocaldbService) { }

  ngOnInit() {
    this.db.iniciar();
    
  }

  public async irRural() {

    const tabla = this.dbo.find(c => c._id === 'ContadorRural').tablaBase;
    debugger;
   let data = await this.db.buscarPrimerElemento(tabla).then( data => { return data;});
   
   if (data === null) {
    this.router.navigate(['/sincronizar-descarga']);
    
   } else {
    this.router.navigate(['/inicio']);
   }
  
  }

  public irUrbano() {

  }

}
