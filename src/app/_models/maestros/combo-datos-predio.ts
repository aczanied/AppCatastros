
export class ComboBox {
    listado: any[] = [];
    cmb: any[] = [];
    selected: any = {};
    // listSelected: any = [];
   }
export class CheckBox {
    selected: boolean;
}
export class CombosDatosPredio {
    cmbTipoPredio: ComboBox;
    cmbCallePrincipal: ComboBox;
    cmbInteseccionUno: ComboBox;
    cmbInteseccionDos: ComboBox;
    cmbZonificaciones: ComboBox;
    cmbBarrios: ComboBox;
    cmbCondominios:  ComboBox;
    cmbTipoCalles:   ComboBox;
    cmbClasificacionSuelo:  ComboBox;
    cmbContribuyente:  ComboBox;
    // PAOLA
    cmbPropietario: ComboBox;
    cmbPropietarioAnt: ComboBox;
    cmbSituacionPredio: ComboBox;
    cmbDominios: ComboBox;
    cmbAdquisiciones: ComboBox;
    cmbCantones: ComboBox;
    cmbFormas: ComboBox;
    cmbTopografias: ComboBox;
    cmbAfectacionTerremoto: ComboBox;
    cmbLocalizacion: ComboBox;
    cmbAfectacion: ComboBox;
    cmbAbastecimientoAgua: ComboBox;
    cmbElectricidad: ComboBox;
    cmbTransporte: ComboBox;
    cmbInternet: ComboBox;
    cmbTipoSuelo: ComboBox;
    cmbAlumbrados: ComboBox;
    cmbRecoleccionBasura: ComboBox;
    cmbEstado: ComboBox;
    cmbAlcantarillado: ComboBox;
    cmbTelefonia: ComboBox;
    cmbAseoCalles: ComboBox;
    cmbUsoSuelo: ComboBox;
    cmbColumnas: ComboBox;
    cmbEntrepisos: ComboBox;
    cmbCubiertas: ComboBox;
    cmbVigasCadenas: ComboBox;
    cmbParedes: ComboBox;
    cmbEscaleras: ComboBox;
    cmbEscalerasAcabado: ComboBox;
    cmbPisos: ComboBox;
    cmbRevestimientoExterior: ComboBox;
    cmbPuertas: ComboBox;
    cmbVentanas: ComboBox;
    cmbRevestimientoInterior: ComboBox;
    cmbTumbado: ComboBox;
    cmbCloset: ComboBox;
    cmbCubreVentana: ComboBox;
    cmbSanitarias: ComboBox;
    cmbElectricas: ComboBox;
    cmbIndustriales: ComboBox;
    cmbEtapas: ComboBox;
    cmbBanios: ComboBox;
    cmbEspeciales: ComboBox;
    cmbConservacion: ComboBox;
    cmbClasificacionUnidad: ComboBox;
    cmbCondicionOcupacion: ComboBox;
    cmbTipoOcupantes: ComboBox;
    cmbTipoVivienda: ComboBox;
    cmbValorCultural: ComboBox;
    cmbTipoUsos: ComboBox;
    cmbTipoUsosDos: ComboBox;
    cmbTipoMejoras: ComboBox;
    cmbCubiertasAcabados: ComboBox;

    // Checkbox
    ckPropietario: CheckBox;
    ckArrendatario: CheckBox;
    ckPosesion: CheckBox;
    ckGratuito: CheckBox;
    ckNinguno: CheckBox;
    ckContratoVigente: CheckBox;
    ckBordillo: CheckBox;
    ckAcera: CheckBox;
    ckPropiedadHorizontal: CheckBox;
    //Paola 10/09
   




    
    constructor() {
        this.cmbTipoPredio = new ComboBox();
        this.cmbCallePrincipal = new ComboBox();
        this.cmbInteseccionUno = new ComboBox();
        this.cmbInteseccionDos = new ComboBox();
        this.cmbZonificaciones = new ComboBox();
        this.cmbBarrios = new ComboBox();
        this.cmbCondominios = new ComboBox();
        this.cmbTipoCalles = new ComboBox();
        this.cmbClasificacionSuelo = new ComboBox();
        // this.cmbPropietario = new ComboBox();
        //PAOLA
        this.cmbPropietario = new ComboBox();
        this.cmbPropietarioAnt = new ComboBox();
        this.cmbSituacionPredio = new ComboBox();
        this.cmbDominios = new ComboBox();
        this.cmbAdquisiciones = new ComboBox();
        this.cmbCantones = new ComboBox();
        this.cmbTopografias = new ComboBox();
        this.cmbAfectacionTerremoto = new ComboBox();
        this.cmbAfectacion = new ComboBox();
        this.cmbAbastecimientoAgua = new ComboBox();
        this.cmbElectricidad = new ComboBox();
        this.cmbTransporte = new ComboBox();
        this.cmbInternet = new ComboBox();
        this.cmbTipoSuelo = new ComboBox();
        this.cmbAlumbrados = new ComboBox();
        this.cmbRecoleccionBasura = new ComboBox();
        this.cmbEstado = new ComboBox();
        this.cmbAlcantarillado = new ComboBox();
        this.cmbTelefonia = new ComboBox();
        this.cmbAseoCalles = new ComboBox();
        this.cmbUsoSuelo = new ComboBox();
        this.cmbColumnas = new ComboBox();
        this.cmbEntrepisos = new ComboBox();
        this.cmbCubiertas = new ComboBox();
        this.cmbVigasCadenas = new ComboBox();
        this.cmbParedes = new ComboBox();
        this.cmbEscaleras = new ComboBox();
        this.cmbEscalerasAcabado = new ComboBox();
        this.cmbPisos = new ComboBox(); 
        this.cmbRevestimientoExterior = new ComboBox();
        this.cmbPuertas = new ComboBox();
        this.cmbVentanas = new ComboBox();
        this.cmbRevestimientoInterior = new ComboBox();
        this.cmbTumbado = new ComboBox();
        this.cmbCloset = new ComboBox();
        this.cmbCubreVentana = new ComboBox();
        this.cmbSanitarias = new ComboBox();
        this.cmbElectricas = new ComboBox();
        this.cmbIndustriales = new ComboBox();
        this.cmbEtapas = new ComboBox();
        this.cmbBanios = new ComboBox();
        this.cmbEspeciales = new ComboBox();
        this.cmbConservacion = new ComboBox();
        this.cmbClasificacionUnidad = new ComboBox();
        this.cmbCondicionOcupacion = new ComboBox();
        this.cmbTipoOcupantes = new ComboBox();
        this.cmbTipoVivienda = new ComboBox();
        this.cmbValorCultural = new ComboBox();
        this.cmbTipoUsos = new ComboBox();
        this.cmbTipoUsosDos = new ComboBox();
        this.cmbLocalizacion = new ComboBox();
        this.cmbFormas = new ComboBox();
        this.cmbTipoMejoras = new ComboBox();
        this.cmbCubiertasAcabados = new ComboBox();

        // Seccion checkbox
     this.ckPropietario =  new CheckBox();
     this.ckArrendatario =  new CheckBox();
     this.ckPosesion = new CheckBox();
     this.ckGratuito = new CheckBox();
     this.ckNinguno = new CheckBox();
     this.ckContratoVigente = new CheckBox();
     this.ckAcera = new CheckBox();
     this.ckBordillo = new CheckBox();
     this.ckPropiedadHorizontal = new CheckBox();

    }
}


export const tabla = {
    informacion_basica: 'informacion-basica',
    informacion_propietario: 'informacion-propietario',
    informacion_ocupante: 'informacion-ocupante',
    datos_predio: 'datos-predio',
    detalles: 'detalles',
    tipo_mejora: 'tipo-mejora',
    tipo_mejora_cmb: 'tipo-mejora-cmb',
    copropietarios:  'copropietarios',
    uso_predio: 'uso-predio',
    contribuyente_predio: 'contribuyente-predio',
    tipo_predio: 'tipo-predio',
    foto_predio: 'fotos',
    aseo_calles: 'aseo-calles',
    tipo_ocupantes: 'tipo-ocupantes',
    tipo_vivienda: 'tipo-vivienda',
    valor_cultural: 'valor-cultural',
    escaleras: 'escaleras',
    escaleras_acabado: 'escaleras_acabado',
    viga_cadena: 'viga-cadena',
    paredes: 'paredes',
    cubiertas: 'cubiertas',
    pisos: 'pisos',
    revestimiento_exterior: 'revestimiento-exterior',
    puertas: 'puertas',
    ventanas: 'ventanas',
    revestimiento_interior: 'revestimiento-interior',
    tumbado: 'tumbado',
    closet: 'closet',
    cubre_ventana: 'cubre-ventana',
    sanitarias: 'sanitarias',
    electricas: 'electricas',
    industriales: 'industriales',
    etapas: 'etapas',
    banos: 'banos',
    especiales: 'especiales',
    conservacion: 'conservacion',
    clasificacion_unidad: 'clasificacion-unidad',
    zonificaciones: 'zonificaciones',
    barrios: 'barrios',
    condominios: 'condominios',
    condicion_ocupacion: 'condicion-ocupacion',
    tipo_calles: 'tipo-calles',
    clasificacion_suelo: 'clasificacion-suelo',
    cantones: 'cantones',
    situacion_predio: 'situacion-predio',
    adquisiciones: 'adquisiciones',
    dominios: 'dominios',
    formas: 'formas',
    topografias: 'topografias',
    afectacion_terremoto: 'afectacion-terremoto',
    localizacion: 'localizacion',
    afectacion: 'afectacion',
    abastecimiento_agua: 'abastecimiento-agua',
    electricidad: 'electricidad',
    transporte: 'transporte',
    internet: 'internet',
    tipo_suelo: 'tipo-suelo',
    alumbrados: 'alumbrados',
    recoleccion_basura: 'recoleccion-basura',
    estado: 'estado',
    alcantarillado: 'alcantarillado',
    telefonia: 'telefonia',
    uso_suelo: 'uso-suelo',
    cubierta_acabados: 'cubierta-acabados',
    verificar_pendientes: 'verificar-pendientes',
    parroquias: 'parroquias',
    informacion_general: 'informacion-general',




    // Tablas de Combos
    entrepisos: 'entrepisos',
    columnas: 'columnas',
    calles: 'calles',
};
