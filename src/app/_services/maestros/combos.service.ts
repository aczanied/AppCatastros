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
    public obtenerCombo(ruta: string, tblBase: string ): Observable<any>  {
    
        const url =  `${environment.apiUrl}${ruta}`;

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
        // Si no hay conexion:
        // En este caso no devuelve nada, debido a que intentamos sincronizarnos.
        return null;
        } else {
        // De lo contrario obtiene la data del API
        // Y la almacena localmente
        return this.http.get(url).pipe(
            map((data: Combo[]) => {

            data.forEach( async item => {
             
              let el: Combo = { ...  {
                _id : item.id.toString(),
                id : item.id,
                _name : item._name
              }};
              console.log(el);
             const a = await this.db.crear({ ...el }, tblBase).then( c => {
                return c;
              });
              console.log('respuesta',a );
            });
          
           
            return true;
            })
        );
        }

    }





}
