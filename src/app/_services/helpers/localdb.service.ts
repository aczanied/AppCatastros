import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {

  constructor(private db: Storage) { }


  public iniciar() {
    console.log('Base de Datos Local Iniciada');
    this.db.create();
  }

  /**
   * Metodo Crear: Inserta Registro en el Storage Local
   * @param {*} objeto
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
  public  crear(objeto: any, tabla: string): Promise<any> {

    return  this.db.get(tabla).then( (items: any[]) => {
     
      if (items) {
        // Buscar Objeto en Base Local
        var idx = items.findIndex( c => c._id === objeto._id);
        if (idx >= 0) {
          // El registro existe y se actualiza
          items[idx] = objeto;
        }
        else {
          // De lo contrario se Agrega
          items.push(objeto);
        }
         this.db.set(tabla, items);
      } else {
         this.db.set(tabla, [objeto]);
      }
    });
  }


  /**
   * Metodo Crear Lista: Inserta Registros de un listado en el Storage Local
   * @param {any[]} objeto
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
  public crearLista(objeto: any[], tabla: string): Promise<any> {

    return this.db.get(tabla).then((items: any[]) => {
      return this.db.set(tabla, objeto);
    });
  }

  /**
   * Metodo Buscar: Devuelve el primer registro de la tabla.
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
  public buscarPrimerElemento(tabla: string): Promise<any> {
    this.iniciar();
    return this.db.get(tabla).then((items: any[]) => {
      if (items) {
        return items[0];
      } else {
        return null;
      }
    });
  }


  /**
   * Metodo Buscar: Devuelve todos los registros de la tabla.
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
  public buscarTodo(tabla: string): Promise<any> {
      this.iniciar();
    return this.db.get(tabla).then((items: any[]) => {
      if (items) {
        return items;
      } else {
        return null;
      }
    });
  }

  
  /**
   * Metodo Buscar: Devuelve todos los registros de la tabla.
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
   public buscar(id: string, tabla: string): Promise<any> {
    return this.db.get(tabla).then((items: any[]) => {
      if (!items || items.length === 0) {
        return null;
      } else {
       return items.find( c => c._id === id);
      }
    });
  }


    /**
   * Metodo Eliminar: Quita un  registro de la Tabla.
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
     public eliminar(id: string, tabla: string): Promise<any> {
      return this.db.get(tabla).then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        } else {
          let idx = items.findIndex( c => c._id === id);
          if (idx == null) {
            return null;
          } else {
            items = items.splice(idx, 0);
            return this.db.set(tabla, items);
          }
        }
      });
    }

      /**
   * Metodo Eliminar: Quita un  registro de la Tabla.
   * @param {string} tabla
   * @return {*}  {Promise<any>}
   * @memberof LocaldbService
   */
       public eliminarTodo(tabla: string): Promise<any> {
        return this.db.get(tabla).then((items: any[]) => {
          if (!items || items.length === 0) {
            return null;
          } else {
              return this.db.set(tabla, []);
          }
        });
      }

  
}
