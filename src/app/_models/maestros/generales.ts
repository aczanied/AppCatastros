export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}
export class Contador {
    '_id': string = '';
    cantidad: number = 0;
    sincronizado: boolean = false;
    fechaSincronizado: Date = new Date;
}
export class Combo {
    _id: string;
    id: number;
    _name: string;
  }

export class LocalData {
    _id: string = '';
    ruta: string = '';
    api: boolean = false;
    tablaBase: string = '';
}

// Configurar el diccionario, una vez agregados se recomienda no alterar los _id
// Es casi seguro que tenga que reconfigurarlos al interior del codigo fuente
export const diccionario: LocalData[] = [
    {
        _id: 'ContadorRural', // No alterar
        tablaBase: 'contador_rural',
        api: false,
        ruta: '',
    },
    // Seccion de Combos
    
    {
        _id: 'Parroquias', // No alterar
        tablaBase: 'parroquias',
        api: true,
        ruta: 'catastro-urbano/parroquias',
     },
    {
       _id: 'InformacionPropietario', // No alterar
       tablaBase: 'informacion_propietario',
       api: false,
        ruta: 'catastro-urbano/informacion-propietario',
    }];


