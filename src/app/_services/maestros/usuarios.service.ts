import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment , } from '../../../environments/environment';
import { from, Observable } from 'rxjs';
import { ConnectionStatus, NetworkService } from '../helpers/network.service';
import { map } from 'rxjs/operators';
import { LocaldbService } from '../helpers/localdb.service';

// Esto corresponde a una interfaz tipada, para el modelo Usuario
// import {  IUsuario } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly apiUrl = `${environment.apiUrl}`;
 
  constructor(private http: HttpClient,
              private networkService: NetworkService,
              private db: LocaldbService) { 

  }


  /**
   * Conexion al metodos "" del API, devuelve los datos del usuario logueado.
   * Controlador: Seguridad/UsuarioController
   * @return {*} 
   * @memberof UsuariosService
   */
  obtenerUsuario(): Observable<any>  {
    const nombreTabla = 'tablaUsuario';
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      // Si no hay conexion:
      // Devuelve la data almacenada localmente
      this.db.iniciar();
      
      // En realidad son documentos,
      // pero me es mas facil asociar como si fueran tablas SQL
      // por el area en que me desenvuelvo.
      return from(this.db.buscarTodo(nombreTabla));
    } else {
      // De lo contrario obtiene la data del API
      // Y la almacena localmente
      // return this.http.get(`${this.apiUrl}/usuario/`).pipe(
      //   map((data: IUsuario) => {
      //     data._id = data.email.trim();
      //     this.db.crear(data, nombreTabla);
      //     return data;
      //   })
      // );
    }

  }


}
