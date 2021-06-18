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

export class CombosService {

  constructor(private http: HttpClient,
              private networkService: NetworkService,
              private db: LocaldbService) {
            
                // Verificar la Base y/o iniciarla
                this.db.iniciar();
  }

    /**
    * Obtiene los datos necesarios para armar un selector.
    */
    public obtenerCombo(ruta: string, tblBase: string ) {
    
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

              let listaData:  Combo[] = [];
         const dat = await data.forEach( async item => {
             
              let el: Combo = { 
                              id : item.id,
                              _name : item._name
                            };
              listaData.push(el);
            });

            const el = {
              _id: tblBase,
              data: listaData
            };

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
