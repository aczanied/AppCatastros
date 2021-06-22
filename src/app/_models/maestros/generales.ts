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
   // _id: string;
    id: number;
    _name: string;
  }

export class LocalData {
    _id: string = '';
    ruta: string = '';
    api: boolean = false;
    tablaBase: string = '';
    esUrbano: boolean = false;
    esRural: boolean = false;
}

// Configurar el diccionario, una vez agregados se recomienda no alterar los _id
// Es casi seguro que tenga que reconfigurarlos al interior del codigo fuente
export const diccionario: LocalData[] = [
    {
        _id: 'ContadorRural', // No alterar
        tablaBase: 'contador_rural',
        api: false,
        ruta: '',
        esUrbano: false,
        esRural: true,
    },
    {
      _id: 'ContadorUrbano', // No alterar
      tablaBase: 'contador_urbano',
      api: false,
      ruta: '',
      esUrbano: true,
      esRural: false,
  },
    // Seccion de Combos
    // 1.  Sincronizar Combo Informacion Basica
     {
        _id: 'InformacionBasica', // No alterar
        tablaBase: 'informacion_basica',
        api: true,
        ruta: 'catastro-urbano/informacion-basica-predio',
        esUrbano: true,
        esRural: false,
     },

    // 2. Sincronizar Combo Informacion Propietario 1
    {
        _id: 'InformacionPropietario', // No alterar
        tablaBase: 'informacion_propietarios',
        api: true,
        ruta: 'catastro-urbano/informacion-propietario',
        esUrbano: true,
        esRural: false,
     },

    // 3. Sincronizar Combo Informacion Ocupante
    {
        _id: 'InformacionOcupante', // No alterar
        tablaBase: 'informacion_ocupantes',
        api: true,
        ruta: 'catastro-urbano/informacion-ocupante',
        esUrbano: true,
        esRural: false,
     },

    // 4. Sincronizar Combo Informacion Uso Predio
    {
        _id: 'InformacionUsoPredio', // No alterar
        tablaBase: 'uso_predios',
        api: true,
        ruta: 'catastro-urbano/caracteristicas/uso-predio',
        esUrbano: true,
        esRural: false,
     },

    // 5. Sincronizar Combo Copropietarios
    {
        _id: 'Copropietario', // No alterar
        tablaBase: 'copropietarios',
        api: true,
        ruta: 'catastro-urbano/caracteristicas/copropietarios',
        esUrbano: true,
        esRural: false,
     },

    // 6. Sincronizar Combo Detalle
    {
        _id: 'Detalle', // No alterar
        tablaBase: 'detalles',
        api: true,
        ruta: 'catastro-urbano/construcciones/detalle',
        esUrbano: true,
        esRural: false,
     },

    // 7. Sincronizar Combo Contribuyente Predios
    {
        _id: 'ContribuyentePredio', // No alterar
        tablaBase: 'contribuyente_predios',
        api: true,
        ruta: 'catastro-urbano/informacion-contribuyente-predios',
        esUrbano: true,
        esRural: false,
     },

      // 8. Sincronizar Combo Datos Predio
    {
        _id: 'DatosPredio', // No alterar
        tablaBase: 'datos_predios',
        api: true,
        ruta: 'catastro-urbano/informacion-datos-predio',
        esUrbano: true,
        esRural: false,
     },

      // 9. Sincronizar Combo Aseo Calles
    {
        _id: 'AseoCalle', // No alterar
        tablaBase: 'aseo_calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/aseo-calles',
        esUrbano: true,
        esRural: false,
     },

    // 10. Sincronizar Combo Tipo Ocupante
    {
        _id: 'TipoOcupante', // No alterar
        tablaBase: 'tipo_ocupantes',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/tipo-ocupantes',
        esUrbano: true,
        esRural: false,
     },

    // 11. Sincronizar Combo Tipo Viviendas
    {
        _id: 'TipoVivienda', // No alterar
        tablaBase: 'tipo_viviendas',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/tipo-viviendas',
        esUrbano: true,
        esRural: false,
     },

    // 12. Sincronizar Combo Valor Cultural
     {
        _id: 'ValorCultural', // No alterar
        tablaBase: 'valor_cultural',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/valor-cultural',
        esUrbano: true,
        esRural: false,
     },

    // 13. Sincronizar Combo Tipo Mejora 
    {
        _id: 'TipoMejora', // No alterar
        tablaBase: 'tipo_mejora_cmb',
        api: true,
        ruta: 'catastro-urbano/construccion/mejoras/tipo-mejora',
        esUrbano: true,
        esRural: false,
     },

    // 13. Sincronizar Combo Tipo Mejora 
    {
        _id: 'TipoMejora', // No alterar
        tablaBase: 'tipo_mejoras',
        api: true,
        ruta: 'catastro-urbano/construccion/mejoras/tipo-mejora',
        esUrbano: true,
        esRural: false,
     },

    {
        _id: 'Entrepisos', // No alterar
        tablaBase: 'entrepisos',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/entrepisos',
        esUrbano: true,
        esRural: false,
     },
     {
        _id: 'Columnas', // No alterar
        tablaBase: 'columnas',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/columnas',
        esUrbano: true,
        esRural: false,
     },
     {
        _id: 'Uso Suelo', // No alterar
        tablaBase: 'uso-suelo',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/uso-suelo',
        esUrbano: true,
        esRural: false,
     },
    {
        _id: 'Cubiertas', // No alterar
        tablaBase: 'cubiertas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/cubiertas',
        esUrbano: true,
        esRural: false,
     },
     {
        _id: 'Parroquias', // No alterar
        tablaBase: 'parroquias',
        api: true,
        ruta: 'catastro-urbano/parroquias',
        esUrbano: true,
        esRural: false,
     },
    {
       _id: 'InformacionPropietario', // No alterar
       tablaBase: 'informacion_propietario',
       api: false,
        ruta: 'catastro-urbano/informacion-propietario',
        esUrbano: true,
        esRural: false,
    }];


