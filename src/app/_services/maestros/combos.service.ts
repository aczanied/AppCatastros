import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, Observable } from 'rxjs';
import { ConnectionStatus, NetworkService } from '../helpers/network.service';
import { LocaldbService } from '../helpers/localdb.service';
import { map } from 'rxjs/operators';
import { Combo } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})

export class SincronizarService {

  constructor(private http: HttpClient,
              private networkService: NetworkService,
              private db: LocaldbService) {
            
                // Verificar la Base y/o iniciarla
                this.db.iniciar();
  }

    /**
    * Obtiene los datos necesarios para armar un selector.
    */
    public descargarDatos(ruta: string, tblBase: string, esCombo: boolean ) {
    
        const url =  `${environment.apiUrl}${ruta}`;

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
        // Si no hay conexion:
        // En este caso no devuelve nada, debido a que intentamos sincronizarnos.
        return null;
        } else {
        // De lo contrario obtiene la data del API
        // Y la almacena localmente
       return this.http.get(url).pipe(
            map(async (data: Combo[]) => {

              console.log(tblBase, data);
              let listaData:  Combo[] = [];

              let el: any;  

              if (esCombo) {
                const dat = await data.forEach( async item => {
             
                  let el: Combo = { 
                                  id : item.id,
                                  _name : item._name
                                };
                  listaData.push(el);
                });
    
                 el = {
                  _id: tblBase,
                  data: listaData
                };
    
               
                
              } else {
               el = {
                _id: tblBase,
                data: data
              };
              }
              
              const result = await this.db.crear({ ...el }, tblBase).then(c => {
                return true;
              }).catch( error => {
                return false;
              });
            
            return result;

            }));
         
        
        }

    }





}
