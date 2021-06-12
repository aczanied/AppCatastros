import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tablas } from 'src/app/_models';
import { LocaldbService } from 'src/app/_services/helpers/localdb.service';

@Component({
  selector: 'app-decidir',
  templateUrl: './decidir.page.html',
  styleUrls: ['./decidir.page.scss'],
})
export class DecidirPage implements OnInit {

  // Variables
  private dbo: Tablas = new Tablas();

  constructor( private router: Router, 
               private db: LocaldbService) { }

  ngOnInit() {
    this.db.iniciar();
    
  }

  public async irRural() {

   let data = await this.db.buscarPrimerElemento(this.dbo.contadorRural).then( data => { return data;});
   
   if (data === null) {
    this.router.navigate(['/sincronizar-descarga']);
    
   } else {
    this.router.navigate(['/inicio']);
   }
  
  }

  public irUrbano() {

  }

}
