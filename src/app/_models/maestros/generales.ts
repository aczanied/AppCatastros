export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}
export class Tarjeta {
   public expanded: boolean;
   public wasExpanded: boolean;
   constructor() {
     this.expanded = false;
     this.wasExpanded = false;
   }
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
    esCombo: boolean = false;
    esUrbano: boolean = false;
    esRural: boolean = false;
}

// Configurar el diccionario, una vez agregados se recomienda no alterar los _id
// Es casi seguro que tenga que reconfigurarlos al interior del codigo fuente
import { DB } from "./tablas";
const db: DB = new DB();

export const diccionario: LocalData[] = [
    {
        _id: db.ContadorRural, // No alterar
        tablaBase: 'contador_rural',
        api: false,
        ruta: '',
        esCombo: false,
        esUrbano: false,
        esRural: true,
    },
    {
      _id: db.ContadorUrbano, // No alterar
      tablaBase: 'contador_urbano',
      api: false,
      ruta: '',
      esCombo: false,
      esUrbano: true,
      esRural: false,
  },
    // Seccion de Combos
    // 1.  Sincronizar Combo Informacion Basica
     {
        _id: db.InformacionBasica, // No alterar
        tablaBase: 'informacion_basica',
        api: true,
        ruta: 'catastro-urbano/informacion-basica-predio',
        esCombo: false,
        esUrbano: true,
        esRural: false,
     },

    // 2. Sincronizar Combo Informacion Propietario 1
    {
        _id: db.InformacionPropietario, // No alterar
        tablaBase: 'informacion_propietarios',
        api: true,
        ruta: 'catastro-urbano/informacion-propietario',
        esCombo: false,
        esUrbano: true,
        esRural: false,
     },

    // 3. Sincronizar Combo Informacion Ocupante
    {
        _id: db.InformacionOcupante, // No alterar
        tablaBase: 'informacion_ocupantes',
        api: true,
        ruta: 'catastro-urbano/informacion-ocupante',
        esCombo: false,
        esUrbano: true,
        esRural: false,
     },

    // 4. Sincronizar Combo Informacion Uso Predio
    {
        _id: db.InformacionUsoPredio, // No alterar
        tablaBase: 'uso_predios',
        api: true,
        ruta: 'catastro-urbano/caracteristicas/uso-predio',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 5. Sincronizar Combo Copropietarios
    {
        _id: db.Copropietario, // No alterar
        tablaBase: 'copropietarios',
        api: true,
        ruta: 'catastro-urbano/caracteristicas/copropietarios',
        esCombo: false,
        esUrbano: true,
        esRural: false,
     },

    // 6. Sincronizar Combo Detalle
    {
        _id: db.Detalle, // No alterar
        tablaBase: 'detalles',
        api: true,
        ruta: 'catastro-urbano/construcciones/detalle',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 7. Sincronizar Combo Contribuyente Predios
    {
        _id: db.ContribuyentePredio, // No alterar
        tablaBase: 'contribuyente_predios',
        api: true,
        ruta: 'catastro-urbano/informacion-contribuyente-predios',
        esCombo: false,
        esUrbano: true,
        esRural: false,
     },

      // 8. Sincronizar Combo Datos Predio
    {
        _id: db.DatosPredio, // No alterar
        tablaBase: 'datos_predios',
        api: true,
        ruta: 'catastro-urbano/informacion-datos-predio',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

      // 9. Sincronizar Combo Aseo Calles
    {
        _id: db.AseoCalle, // No alterar
        tablaBase: 'aseo_calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/aseo-calles',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 10. Sincronizar Combo Tipo Ocupante
    {
        _id: db.TipoOcupante, // No alterar
        tablaBase: 'tipo_ocupantes',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/tipo-ocupantes',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 11. Sincronizar Combo Tipo Viviendas
    {
        _id: db.TipoVivienda, // No alterar
        tablaBase: 'tipo_viviendas',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/tipo-viviendas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 12. Sincronizar Combo Valor Cultural
     {
        _id: db.ValorCultural, // No alterar
        tablaBase: 'valor_cultural',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/valor-cultural',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 13. Sincronizar Combo Tipo Mejora 
    {
        _id: db.TipoMejora, // No alterar
        tablaBase: 'tipo_mejora_cmb',
        api: true,
        ruta: 'catastro-urbano/construccion/mejoras/tipo-mejora',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 14. Sincronizar Lista Tipo Mejora 
    {
        _id: db.TipoMejoraLT, // No alterar
        tablaBase: 'tipo_mejoras',
        api: true,
        ruta: 'catastro-urbano/construcciones/tipo-mejoras',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 15. Sincronizar Combo Escalera
    {
        _id: db.Escalera, // No alterar
        tablaBase: 'escaleras',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/escaleras',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 16. Sincronizar Combo Escaleras Acabados
     {
        _id: db.EscalerasAcabado, // No alterar
        tablaBase: 'escaleras_acabados',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/escaleras',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 17. Sincronizar Combo Viga Cadena
     {
        _id: db.VigaCadena, // No alterar
        tablaBase: 'viga_cadenas',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/vigas-cadenas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 18. Sincronizar Combo Paredes
    {
        _id: db.Pared, // No alterar
        tablaBase: 'paredes',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/paredes',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },
    
    // 19. Sincronizar Combo Cubiertas
    {
        _id: db.Cubierta, // No alterar
        tablaBase: 'cubiertas',
        api: true,
        ruta: 'catastro-urbano/construccion/estructuras/cubiertas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 20. Sincronizar Combo Pisos
     {
        _id: db.Piso, // No alterar
        tablaBase: 'pisos',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/pisos',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 21. Sincronizar Combo Revestimiento Exterior
     {
        _id: db.RevestimientoExterior, // No alterar
        tablaBase: 'revestimiento_exterior',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/revestimiento-exterior',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 22. Sincronizar Combo Puertas
    {
        _id: db.Puerta, // No alterar
        tablaBase: 'puertas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/puertas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 23. Sincronizar Combo Ventana
    {
        _id: db.Ventana, // No alterar
        tablaBase: 'ventanas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/ventanas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 24. Sincronizar Combo Revestimiento Interior
      {
        _id: db.RevestimientoInterior, // No alterar
        tablaBase: 'revestimiento_interior',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/revestimiento-interior',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 25. Sincronizar Combo Tumbados
    {
        _id: db.Tumbado, // No alterar
        tablaBase: 'tumbados',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/tumbados',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 26. Sincronizar Combo Closet
     {
        _id: db.Closet, // No alterar
        tablaBase: 'closets',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/closet',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 27. Sincronizar Combo Cubre Ventana
    {
        _id: db.CubreVentana, // No alterar
        tablaBase: 'cubre_ventanas',
        api: true,
        ruta: 'catastro-urbano/construccion/acabados/cubre-ventanas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 28. Sincronizar Combo Sanitarias
     {
        _id: db.Sanitaria, // No alterar
        tablaBase: 'sanitarias',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/sanitarias',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 29. Sincronizar Combo Electricas
      {
        _id: db.Electrica, // No alterar
        tablaBase: 'electricas',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/electricas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 30. Sincronizar Combo Industriales
    {
        _id: db.Industrial, // No alterar
        tablaBase: 'industriales',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/industriales',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 31. Sincronizar Combo Etapas
    {
        _id: db.Etapa, // No alterar
        tablaBase: 'etapas',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/etapas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 32. Sincronizar Combo Banos
     {
        _id: db.Bano, // No alterar
        tablaBase: 'banos',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/banos',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 33. Sincronizar Combo Especiales
     {
        _id: db.Especial, // No alterar
        tablaBase: 'especiales',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/especiales',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 34. Sincronizar Combo Conservacion
    {
        _id: db.Conservacion, // No alterar
        tablaBase: 'conservacion',
        api: true,
        ruta: 'catastro-urbano/construccion/instalaciones/conservacion',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 35. Sincronizar Combo Clasificacion Unidad
     {
        _id: db.ClasificacionUnidad, // No alterar
        tablaBase: 'clasificacion_unidad',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/clasificacion-unidad',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 36. Sincronizar Combo Tipo Predio
     {
        _id: db.TipoPredio, // No alterar
        tablaBase: 'tipo_predio',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/tipo-predio',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 37. Sincronizar Combo Calles
     {
        _id: db.Calle, // No alterar
        tablaBase: 'calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/calles',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 38. Sincronizar Combo Zonificaciones
    {
        _id: db.Zonificacion, // No alterar
        tablaBase: 'zonificaciones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/zonificaciones',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 39. Sincronizar Combo Barrios
     {
        _id: db.Barrio, // No alterar
        tablaBase: 'barrios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/barrios',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

      // 40. Sincronizar Combo Condominios
      {
        _id: db.Condominio, // No alterar
        tablaBase: 'condominios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/condominios',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 41. Sincronizar Combo Condicion Ocupacion
    {
        _id: db.CondicionOcupacion, // No alterar
        tablaBase: 'condicion_ocupacion',
        api: true,
        ruta: 'catastro-urbano/construccion/datos-adicionales/condicion-ocupacion',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 42. Sincronizar Combo Tipo Calles
    {
        _id: db.TipoCalle, // No alterar
        tablaBase: 'tipo_calles',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/tipo-calles',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 43. Sincronizar Combo Clasificacion Suelo
     {
        _id: db.ClasificacionSuelo, // No alterar
        tablaBase: 'clasificacion_suelo',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/clasificacion-suelo',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 44. Sincronizar Combo Cantones
     {
        _id: db.Canton, // No alterar
        tablaBase: 'cantones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/cantones',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 45. Sincronizar Combo Situacion Predio
     {
        _id: db.SituacionPredio, // No alterar
        tablaBase: 'situacion_predio',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/situacion-predio',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 46. Sincronizar Combo Adquisiciones
     {
        _id: db.Adquisicion, // No alterar
        tablaBase: 'adquisiciones',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/adquisiciones',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 47. Sincronizar Combo Dominios
     {
        _id:  db.Dominio, // No alterar
        tablaBase: 'dominios',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/dominios',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 48. Sincronizar Combo Formas
    {
        _id:  db.Forma, // No alterar
        tablaBase: 'formas',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/formas',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

     // 49. Sincronizar Combo Topografias
     {
        _id:  db.Topografia, // No alterar
        tablaBase: 'topografias',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/topografias',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

    // 50. Sincronizar Combo Afectacion Terremoto
      {
        _id:  db.AfectacionTerremoto, // No alterar
        tablaBase: 'afectacion_terremoto',
        api: true,
        ruta: 'catastro-urbano/datos-predio/informacion-general/afectacion-terremoto',
        esCombo: true,
        esUrbano: true,
        esRural: false,
     },

      // 51. Sincronizar Combo Localizacion
       {
         _id:  db.Localizacion, // No alterar
         tablaBase: 'localizaciones',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/localizacion',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 52. Sincronizar Combo Afectacion
      {
         _id:  db.Afectacion, // No alterar
         tablaBase: 'afectaciones',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/afectacion',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 53. Sincronizar Combo Abastecimiento Agua
       {
         _id:  db.AbastecimientoAgua, // No alterar
         tablaBase: 'abastecimiento_agua',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/abastecimiento-agua',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 54. Sincronizar Combo Electricidad
       {
         _id:  db.Electricidad, // No alterar
         tablaBase: 'electricidad',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/electricidad',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 55. Sincronizar Combo Transporte
      {
         _id:  db.Transporte, // No alterar
         tablaBase: 'transportes',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/transporte',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },


      // 56. Sincronizar Combo Internet
      {
         _id:  db.Internet, // No alterar
         tablaBase: 'internet',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/internet',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },


      // 57. Sincronizar Combo Tipo Suelo
      {
         _id:  db.TipoSuelo, // No alterar
         tablaBase: 'tipo_suelo',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/tipo-suelo',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

       // 58. Sincronizar Combo Alumbrados
       {
         _id:  db.Alumbrado, // No alterar
         tablaBase: 'alumbrados',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/alumbrado',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 59. Sincronizar Combo Recoleccion Basura
       {
         _id:  db.RecoleccionBasura, // No alterar
         tablaBase: 'recoleccion_basura',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/recoleccion-basura',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 60. Sincronizar Combo Estado
        {
         _id:  db.Estado, // No alterar
         tablaBase: 'estados',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/estado',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 61. Sincronizar Combo Alcantarillado
      {
         _id:  db.Alcantarillado, // No alterar
         tablaBase: 'alcantarillados',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/alcantarillado',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 62. Sincronizar Combo Telefonia
      {
         _id:  db.Telefonia, // No alterar
         tablaBase: 'telefonia',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/telefonia',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 63. Sincronizar Combo Uso Suelo
      {
         _id:  db.UsoSuelo, // No alterar
         tablaBase: 'uso_suelo',
         api: true,
         ruta: 'catastro-urbano/datos-predio/informacion-general/uso-suelo',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 64. Sincronizar Combo Columnas
      {
         _id:  db.Columna, // No alterar
         tablaBase: 'columnas',
         api: true,
         ruta: 'catastro-urbano/construccion/estructuras/columnas',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },


      // 65. Sincronizar Combo Entrepisos
      {
         _id:  db.Entrepiso, // No alterar
         tablaBase: 'entrepisos',
         api: true,
         ruta: 'catastro-urbano/construccion/estructuras/entrepisos',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 66. Sincronizar Combo Cubierta Acabado
      {
         _id:  db.CubiertaAcabado, // No alterar
         tablaBase: 'cubierta_acabados',
         api: true,
         ruta: 'catastro-urbano/construccion/acabados/cubiertas',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 67. Sincronizar Combo Parroquias
      {
         _id:  db.Parroquia, // No alterar
         tablaBase: 'parroquias',
         api: true,
         ruta: 'catastro-urbano/parroquias',
         esCombo: true,
         esUrbano: true,
         esRural: false,
      },

      // 68. Sincronizar Combo Informacion General
        {
         _id:  db.InformacionGeneral, // No alterar
         tablaBase: 'informacion_general',
         api: true,
         ruta: 'catastro-urbano/informacion-general',
         esCombo: false,
         esUrbano: true,
         esRural: false,
      }



   







   //  {
   //      _id:  db.Entrepisos, // No alterar
   //      tablaBase: 'entrepisos',
   //      api: true,
   //      ruta: 'catastro-urbano/construccion/estructuras/entrepisos',
   //      esUrbano: true,
   //      esRural: false,
   //   },
   //   {
   //      _id:  db.Columnas, // No alterar
   //      tablaBase: 'columnas',
   //      api: true,
   //      ruta: 'catastro-urbano/construccion/estructuras/columnas',
   //      esUrbano: true,
   //      esRural: false,
   //   },
   //   {
   //      _id:  db.Uso Suelo, // No alterar
   //      tablaBase: 'uso-suelo',
   //      api: true,
   //      ruta: 'catastro-urbano/datos-predio/informacion-general/uso-suelo',
   //      esUrbano: true,
   //      esRural: false,
   //   },
   //  {
   //      _id:  db.Cubiertas, // No alterar
   //      tablaBase: 'cubiertas',
   //      api: true,
   //      ruta: 'catastro-urbano/construccion/acabados/cubiertas',
   //      esUrbano: true,
   //      esRural: false,
   //   },
   //   {
   //      _id:  db.Parroquias, // No alterar
   //      tablaBase: 'parroquias',
   //      api: true,
   //      ruta: 'catastro-urbano/parroquias',
   //      esUrbano: true,
   //      esRural: false,
   //   },
   //  {
   //     _id:  db.InformacionPropietario, // No alterar
   //     tablaBase: 'informacion_propietario',
   //     api: false,
   //      ruta: 'catastro-urbano/informacion-propietario',
   //      esUrbano: true,
   //      esRural: false,
   //  }
   ];


