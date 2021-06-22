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

    // 14. Sincronizar Lista Tipo Mejora 
    {
        _id: 'TipoMejoraLT', // No alterar
        tablaBase: 'tipo_mejoras',
        api: true,
        ruta: 'catastro-urbano/construcciones/tipo-mejoras',
        esUrbano: true,
        esRural: false,
     },

    // 15. Sincronizar Combo Escalera
    {
        _id: 'Escalera', // No alterar
        tablaBase: 'escaleras',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/escaleras',
        esUrbano: true,
        esRural: false,
     },

     // 16. Sincronizar Combo Escaleras Acabados
     {
        _id: 'EscalerasAcabado', // No alterar
        tablaBase: 'escaleras_acabados',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/escaleras',
        esUrbano: true,
        esRural: false,
     },

    // 17. Sincronizar Combo Viga Cadena
     {
        _id: 'VigaCadena', // No alterar
        tablaBase: 'viga_cadenas',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/vigas-cadenas',
        esUrbano: true,
        esRural: false,
     },

    // 18. Sincronizar Combo Paredes
    {
        _id: 'Pared', // No alterar
        tablaBase: 'paredes',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/paredes',
        esUrbano: true,
        esRural: false,
     },
    
    // 19. Sincronizar Combo Cubiertas
    {
        _id: 'Cubierta', // No alterar
        tablaBase: 'cubiertas',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/cubiertas',
        esUrbano: true,
        esRural: false,
     },

    // 20. Sincronizar Combo Pisos
     {
        _id: 'Piso', // No alterar
        tablaBase: 'pisos',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/pisos',
        esUrbano: true,
        esRural: false,
     },

    // 21. Sincronizar Combo Revestimiento Exterior
     {
        _id: 'RevestimientoExterior', // No alterar
        tablaBase: 'revestimiento_exterior',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/revestimiento-exterior',
        esUrbano: true,
        esRural: false,
     },

    // 22. Sincronizar Combo Puertas
    {
        _id: 'Puerta', // No alterar
        tablaBase: 'puertas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/puertas',
        esUrbano: true,
        esRural: false,
     },

    // 23. Sincronizar Combo Ventana
    {
        _id: 'Ventana', // No alterar
        tablaBase: 'ventanas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/ventanas',
        esUrbano: true,
        esRural: false,
     },

    // 24. Sincronizar Combo Revestimiento Interior
      {
        _id: 'RevestimientoInterior', // No alterar
        tablaBase: 'revestimiento_interior',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/revestimiento-interior',
        esUrbano: true,
        esRural: false,
     },

    // 25. Sincronizar Combo Tumbados
    {
        _id: 'Tumbado', // No alterar
        tablaBase: 'tumbados',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/tumbados',
        esUrbano: true,
        esRural: false,
     },

    // 26. Sincronizar Combo Closet
     {
        _id: 'Closet', // No alterar
        tablaBase: 'closets',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/closet',
        esUrbano: true,
        esRural: false,
     },

    // 27. Sincronizar Combo Cubre Ventana
    {
        _id: 'CubreVentana', // No alterar
        tablaBase: 'cubre_ventanas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/cubre-ventanas',
        esUrbano: true,
        esRural: false,
     },

     // 28. Sincronizar Combo Sanitarias
     {
        _id: 'Sanitaria', // No alterar
        tablaBase: 'sanitarias',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/sanitarias',
        esUrbano: true,
        esRural: false,
     },

    // 29. Sincronizar Combo Electricas
      {
        _id: 'Electrica', // No alterar
        tablaBase: 'electricas',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/electricas',
        esUrbano: true,
        esRural: false,
     },

    // 30. Sincronizar Combo Industriales
    {
        _id: 'Industrial', // No alterar
        tablaBase: 'industriales',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/industriales',
        esUrbano: true,
        esRural: false,
     },

    // 31. Sincronizar Combo Etapas
    {
        _id: 'Etapa', // No alterar
        tablaBase: 'etapas',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/etapas',
        esUrbano: true,
        esRural: false,
     },

     // 32. Sincronizar Combo Banos
     {
        _id: 'Bano', // No alterar
        tablaBase: 'banos',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/banos',
        esUrbano: true,
        esRural: false,
     },

     // 33. Sincronizar Combo Especiales
     {
        _id: 'Especial', // No alterar
        tablaBase: 'especiales',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/especiales',
        esUrbano: true,
        esRural: false,
     },

    // 34. Sincronizar Combo Conservacion
    {
        _id: 'Conservacion', // No alterar
        tablaBase: 'conservacion',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/conservacion',
        esUrbano: true,
        esRural: false,
     },

     // 35. Sincronizar Combo Clasificacion Unidad
     {
        _id: 'ClasificacionUnidad', // No alterar
        tablaBase: 'clasificacion_unidad',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/clasificacion-unidad',
        esUrbano: true,
        esRural: false,
     },

     // 36. Sincronizar Combo Tipo Predio
     {
        _id: 'TipoPredio', // No alterar
        tablaBase: 'tipo_predio',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/tipo-predio',
        esUrbano: true,
        esRural: false,
     },

     // 37. Sincronizar Combo Calles
     {
        _id: 'Calle', // No alterar
        tablaBase: 'calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/calles',
        esUrbano: true,
        esRural: false,
     },

    // 38. Sincronizar Combo Zonificaciones
    {
        _id: 'Zonificacion', // No alterar
        tablaBase: 'zonificaciones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/zonificaciones',
        esUrbano: true,
        esRural: false,
     },

     // 39. Sincronizar Combo Barrios
     {
        _id: 'Barrio', // No alterar
        tablaBase: 'barrios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/barrios',
        esUrbano: true,
        esRural: false,
     },

      // 40. Sincronizar Combo Condominios
      {
        _id: 'Condominio', // No alterar
        tablaBase: 'condominios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/condominios',
        esUrbano: true,
        esRural: false,
     },

    // 41. Sincronizar Combo Condicion Ocupacion
    {
        _id: 'CondicionOcupacion', // No alterar
        tablaBase: 'condicion_ocupacion',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/condicion-ocupacion',
        esUrbano: true,
        esRural: false,
     },

    // 42. Sincronizar Combo Tipo Calles
    {
        _id: 'TipoCalle', // No alterar
        tablaBase: 'tipo_calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/tipo-calles',
        esUrbano: true,
        esRural: false,
     },

     // 43. Sincronizar Combo Clasificacion Suelo
     {
        _id: 'ClasificacionSuelo', // No alterar
        tablaBase: 'clasificacion_suelo',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/clasificacion-suelo',
        esUrbano: true,
        esRural: false,
     },

     // 44. Sincronizar Combo Cantones
     {
        _id: 'Canton', // No alterar
        tablaBase: 'cantones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/cantones',
        esUrbano: true,
        esRural: false,
     },

     // 45. Sincronizar Combo Situacion Predio
     {
        _id: 'SituacionPredio', // No alterar
        tablaBase: 'situacion_predio',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/situacion-predio',
        esUrbano: true,
        esRural: false,
     },

     // 46. Sincronizar Combo Adquisiciones
     {
        _id: 'Adquisicion', // No alterar
        tablaBase: 'adquisiciones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/adquisiciones',
        esUrbano: true,
        esRural: false,
     },

     // 47. Sincronizar Combo Dominios
     {
        _id: 'Dominio', // No alterar
        tablaBase: 'dominios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/dominios',
        esUrbano: true,
        esRural: false,
     },

    // 48. Sincronizar Combo Formas
    {
        _id: 'Forma', // No alterar
        tablaBase: 'formas',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/formas',
        esUrbano: true,
        esRural: false,
     },

     // 49. Sincronizar Combo Topografias
     {
        _id: 'Topografia', // No alterar
        tablaBase: 'topografias',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/topografias',
        esUrbano: true,
        esRural: false,
     },

    // 50. Sincronizar Combo Afectacion Terremoto
      {
        _id: 'AfectacionTerremoto', // No alterar
        tablaBase: 'afectacion_terremoto',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/afectacion-terremoto',
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


