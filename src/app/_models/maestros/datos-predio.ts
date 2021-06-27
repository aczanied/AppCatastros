import { NumericValueAccessor } from '@ionic/angular';
import { ComboBox } from './combo-datos-predio';


// CREAR PREDIO

export class InformacionGeneral {
    canton_codigo: string;
    canton_id: number;
    direccion: string;
    id: number;
    nombre: string;
    provincia_codigo: string;
    telefonos: string;

    // Auditoria de Sincronizacion
    estado_logico: string;
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
    }

    export class Predios {
        clave: string;
        clave_parcial: string;
        cmbParroquias: ComboBox;
        cmbPropietario: ComboBox;
        provincia_codigo: string;
        canton_codigo: string;
        parroquia_codigo: string;
        zona_codigo: string;
        sector_codigo: string;
        manzana_codigo: string;
        predio_codigo: string;
        bloque_codigo: string;
        piso_codigo: string;
        departamento_codigo: string;
        /**
         *
         */
        constructor() {
             this.provincia_codigo = '00';
             this.canton_codigo = '00';
             this.parroquia_codigo = '00';
             this.zona_codigo = '00';
             this.sector_codigo = '00';
             this.manzana_codigo = '000';
             this.predio_codigo = '000';
             this.bloque_codigo = '00';
             this.piso_codigo = '00';
             this.departamento_codigo = '000';
        }
    }


export class TipoMejora {
    cantidad: number;
    estado: number;
    id: number;
    prediourb_id: string;
    tipo_mejoras_id: number;

    // Auditoria de Sincronizacion
    estado_logico: string;
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
       /**
         *
         */
        constructor() {
            this.cantidad = 0;
            this.estado = 0;
            this.prediourb_id = '00';
            this.tipo_mejoras_id = 0;
   }
}

export class ListaTipoMejora extends TipoMejora{
    cmb_tipo_mejoras_id: ComboBox;
            constructor() {
                super();
                this.cmb_tipo_mejoras_id = new ComboBox();
            }
}

export class DatosAdicionales {
    checked: boolean;
    bloque: string;
    piso: string;
    departamento: string;
    estado_logico: string;
    acabado_closet_id: number;
    acabado_cubierta_id: number;
    acabado_cubventana_id: number;
    acabado_escalera_id: number;
    acabado_pisos_id: number;
    acabado_puertas_id: number;
    acabado_revesexte_id: number;
    acabado_revesinte_id: number;
    acabado_tumbados_id: number;
    acabado_ventanas_id: number;
    anio_const: number;
    area_const: number;
    cant_banos: number;
    cant_celulares: number;
    cant_dormitorios: number;
    cant_habit: number;
    cant_telef: number;
    clasificacion_unidad_id: number;
    condicion_ocupacion_id: number;
    construccion_id: string;
    estado: number;
    estructura_columna_id: number;
    estructura_cubierta_id: number;
    estructura_entrepiso_id: number;
    estructura_escaleras_id: number;
    estructura_paredes_id: number;
    estructura_vigascadenas_id: number;
    id: number;
    instalacion_banos_id: number;
    instalacion_conservacion_id: number;
    instalacion_electricas_id: number;
    instalacion_especiales_id: number;
    instalacion_etapa_id: number;
    instalacion_indust_id: number;
    instalacion_sanitarias_id: number;
    num_habitantes: number;
    prediourb_id: string;
    tipo_ocupantes_id: number;
    tipo_usos2_id: number;
    tipo_usos_id: number;
    tipo_vivienda_id: number;
    valor_cultural_id: number;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
    /**
     *
     */
    constructor() {
        this.checked = false;
        this.bloque = '';
        this.piso = '';
        this.departamento = '';
        this.estado_logico = '';
        this.acabado_closet_id = 1;
        this.acabado_cubierta_id = 1;
        this.acabado_cubventana_id = 1;
        this.acabado_escalera_id = 1;
        this.acabado_pisos_id = 1;
        this.acabado_puertas_id = 1;
        this.acabado_revesexte_id = 1;
        this.acabado_revesinte_id = 1;
        this.acabado_tumbados_id = 1;
        this.acabado_ventanas_id = 1;
        this.anio_const = 0;
        this.area_const = 0;
        this.cant_banos = 0;
        this.cant_celulares = 0;
        this.cant_dormitorios = 0;
        this.cant_habit = 0;
        this.cant_telef = 0;
        this.clasificacion_unidad_id = 1;
        this.condicion_ocupacion_id = 1;
        this.construccion_id = '';
        this.estado = 0;
        this.estructura_columna_id = 1;
        this.estructura_cubierta_id = 1;
        this.estructura_entrepiso_id = 1;
        this.estructura_escaleras_id = 1;
        this.estructura_paredes_id = 1;
        this.estructura_vigascadenas_id = 1;
        this.id = 0;
        this.instalacion_banos_id = 1;
        this.instalacion_conservacion_id = 1;
        this.instalacion_electricas_id = 1;
        this.instalacion_especiales_id = 1;
        this.instalacion_etapa_id = 1;
        this.instalacion_indust_id = 1;
        this.instalacion_sanitarias_id = 1;
        this.num_habitantes = 0;
        this.prediourb_id = '';
        this.tipo_ocupantes_id = 0;
        this.tipo_usos2_id = 1100;
        this.tipo_usos_id = 1100;
        this.tipo_vivienda_id = 1;
        this.valor_cultural_id = 1;
        // Auditoria de Sincronizacion
        this.fecha_modificacion = new Date();
        this.fecha_hora = new Date();
        this.estado_sincronizado = false;
        this.estado_modificado = true;
        this.updated_users = '';

    }
}

export class ListaDatosAdicionales extends DatosAdicionales{
    cmb_acabado_closet_id: ComboBox;
    cmb_acabado_cubierta_id: ComboBox;
    cmb_acabado_cubventana_id: ComboBox;
    cmb_acabado_escalera_id: ComboBox;
    cmb_acabado_pisos_id: ComboBox;
    cmb_acabado_puertas_id: ComboBox;
    cmb_acabado_revesexte_id: ComboBox;
    cmb_acabado_revesinte_id: ComboBox;
    cmb_acabado_tumbados_id: ComboBox;
    cmb_acabado_ventanas_id: ComboBox;
    cmb_clasificacion_unidad_id: ComboBox;
    cmb_condicion_ocupacion_id: ComboBox;
    cmb_construccion_id: ComboBox;
    cmb_estructura_columna_id: ComboBox;
    cmb_estructura_cubierta_id: ComboBox;
    cmb_estructura_entrepiso_id: ComboBox;
    cmb_estructura_escaleras_id: ComboBox;
    cmb_estructura_paredes_id: ComboBox;
    cmb_estructura_vigascadenas_id: ComboBox;
    cmb_instalacion_banos_id: ComboBox;
    cmb_instalacion_conservacion_id: ComboBox;
    cmb_instalacion_electricas_id: ComboBox;
    cmb_instalacion_especiales_id: ComboBox;
    cmb_instalacion_etapa_id: ComboBox;
    cmb_instalacion_indust_id: ComboBox;
    cmb_instalacion_sanitarias_id: ComboBox;
    cmb_prediourb_id: ComboBox;
    cmb_tipo_ocupantes_id: ComboBox;
    cmb_tipo_usos2_id: ComboBox;
    cmb_tipo_usos_id: ComboBox;
    cmb_tipo_vivienda_id: ComboBox;
    cmb_valor_cultural_id: ComboBox;
    constructor() {
        super();
        this.cmb_acabado_closet_id = new ComboBox();
         this.cmb_acabado_cubierta_id = new ComboBox();
         this.cmb_acabado_cubventana_id = new ComboBox();
         this.cmb_acabado_escalera_id = new ComboBox();
         this.cmb_acabado_pisos_id = new ComboBox();
         this.cmb_acabado_puertas_id = new ComboBox();
         this.cmb_acabado_revesexte_id = new ComboBox();
         this.cmb_acabado_revesinte_id = new ComboBox();
         this.cmb_acabado_tumbados_id = new ComboBox();
         this.cmb_acabado_ventanas_id = new ComboBox();
         this.cmb_clasificacion_unidad_id = new ComboBox();
         this.cmb_construccion_id = new ComboBox();
         this.cmb_estructura_columna_id = new ComboBox();
         this.cmb_estructura_cubierta_id = new ComboBox();
         this.cmb_estructura_entrepiso_id = new ComboBox();
         this.cmb_estructura_escaleras_id = new ComboBox();
         this.cmb_estructura_paredes_id = new ComboBox();
         this.cmb_estructura_vigascadenas_id = new ComboBox();
         this.cmb_instalacion_banos_id = new ComboBox();
         this.cmb_instalacion_conservacion_id = new ComboBox();
         this.cmb_instalacion_electricas_id = new ComboBox();
         this.cmb_instalacion_especiales_id = new ComboBox();
         this.cmb_instalacion_etapa_id = new ComboBox();
         this.cmb_instalacion_indust_id = new ComboBox();
         this.cmb_instalacion_sanitarias_id = new ComboBox();
         this.cmb_prediourb_id = new ComboBox();
         this.cmb_tipo_ocupantes_id = new ComboBox();
         this.cmb_tipo_usos2_id = new ComboBox();
         this.cmb_tipo_usos_id = new ComboBox();
         this.cmb_tipo_vivienda_id = new ComboBox();
         this.cmb_valor_cultural_id = new ComboBox();
    }
}

export class Copropietario {
    contribuyente_id: number;
    estado: number;
    id: number;
    porcentaje: number;
    prediourb_id: string;

    // Auditoria de Sincronizacion
    estado_logico: string;
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

        constructor() {
            this.contribuyente_id = 0;
            this.estado = 0;
            this.porcentaje = 0;
            this.prediourb_id = '00';
   }
}

export class ListaCopropietario extends Copropietario {
    cmb_contribuyente_id: ComboBox;
    constructor() {
        super();
    }
}



export class InformacionBasica {
    calle_principal_id: number;
    ciudadela_predio_id: number;
    clasificacion_suelo_id: number;
    clave: string;
    clave_anterior: string;
    condominio_predio_id: number;
    interseccion1_id: number;
    interseccion2_id: number;
    lote: string;
    manzana: string;
    nomenclatura: string;
    tipo_predio_id: number;
    tipo_via_id: number;
    zonificacion_predio_id: number;
    observaciones: string;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    constructor() {
    this.calle_principal_id = 0;
    this.ciudadela_predio_id = 0;
    this.clasificacion_suelo_id = 0;
    this.condominio_predio_id = 0;
    this.interseccion1_id = 0;
    this.interseccion2_id = 0;
    this.lote = '00';
    this.manzana = '00';
    this.nomenclatura = '00';
    this.tipo_predio_id = 0;
    this.tipo_via_id = 0;
    this.zonificacion_predio_id = 0;
    this.observaciones = '00';
}
}

export class InformacionPropietario {
    adquisicion_predio_id: number;
    anios_posesion: number;
    anios_sin_perfec: number;
    canton_id: number;
    clave: string;
    contribuyente_id: number;
    cuantia: number;
    dominio_predio_id: number;
    fecha_protocolizacion: string;
    fecha_registro: string;
    folio: string;
    notaria: string;
    num_partida: string;
    num_registro: string;
    propietario_anterior_id: number;
    situacion_predio_id: number;
    tomo: string;

    /**
     *
     */
    constructor() {
        this.adquisicion_predio_id = 0;
        this.anios_posesion  = 0;
        this.anios_sin_perfec  = 0;
        this.canton_id  = 0;
        this.clave = '';
        this.contribuyente_id = 0;
        this.cuantia = 0;
        this.dominio_predio_id = 0;
        this.fecha_protocolizacion = '';
        this.fecha_registro = '';
        this.folio = '';
        this.notaria = '';
        this.num_partida = '';
        this.num_registro = '';
        this.propietario_anterior_id = 0;
        this.situacion_predio_id = 0;
        this.tomo = '';
    }
    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
}

export class InformacionOcupante {
    clave: string;
    contrato_vigente: boolean;
    fecha_inscripcion: string;
    nombre_arrendatario: string;
    oc_arrendatario: boolean;
    oc_ninguno: boolean;
    oc_posesion: boolean;
    oc_propietario: boolean;
    oc_titulo_gratuito: boolean;
    registro_numero: string;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
    
    constructor() {
        this.fecha_inscripcion = '';
        this.nombre_arrendatario = '';
        this.registro_numero = '00';
    }
}

export class DatosPredio {
    alcantarillado_predio_id: number;
    aseo_predio_id: number;
    telefonia_predio_id: number;
    abastecimiento_agua_id: number;
    tiene_acera: boolean;
    tiene_bordillo: boolean;
    afectacion_predio_id: number;
    afectacion_terremoto_id: number;
    alicuota: number;
    alumbrado_predio_id: number;
    area: number;
    area_construccion_comunal: number;
    area_construccion_util: number;
    area_escritura: number;
    area_terreno_comunal: number;
    area_terreno_util: number;
    avaluo_construccion: number;
    avaluo_propiedad: number;
    avaluo_suelo: number;
    bloques_construidos: number;
    bloques_en_construccion: number;
    clave:  string;
    coordenada_x: number;
    coordenada_y: number;
    energia_electrica_id: number;
    estado_predio_id: number;
    fondo: number;
    forma_predio_id: number;
    frente: number;
    internet_predio_id: number;
    localizacion_predio_id: number;
    nro_angulosrectos: number;
    nro_lados: number;
    nro_medidores_agua: number;
    perimetro: number;
    propiedad_horizontal: number;
    recoleccion_basura_id: number;
    tipo_suelo_id: number;
    topografia_predio_id: number;
    transporte_urbano_id: number;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    constructor() {
    this.alcantarillado_predio_id = 0;
    this.aseo_predio_id = 0;
    this.telefonia_predio_id = 0;
    this.abastecimiento_agua_id = 0;
    this.afectacion_predio_id = 0;
    this.afectacion_terremoto_id = 0;
    this.alicuota = 0;
    this.alumbrado_predio_id = 0;
    this.area = 0;
    this.area_construccion_comunal = 0;
    this.area_construccion_util = 0;
    this.area_escritura = 0;
    this.area_terreno_comunal = 0;
    this.area_terreno_util = 0;
    this.avaluo_construccion = 0;
    this.avaluo_propiedad = 0;
    this.avaluo_suelo = 0;
    this.bloques_construidos = 0;
    this.bloques_en_construccion = 0;
    this.coordenada_x = 0;
    this.coordenada_y = 0;
    this.energia_electrica_id = 0;
    this.estado_predio_id = 0;
    this.fondo = 0;
    this.forma_predio_id = 0;
    this.frente = 0;
    this.internet_predio_id = 0;
    this.localizacion_predio_id = 0;
    this.nro_angulosrectos = 0;
    this.nro_lados = 0;
    this.nro_medidores_agua = 0;
    this.perimetro = 0;
    this.propiedad_horizontal = 0;
    this.recoleccion_basura_id = 0;
    this.tipo_suelo_id = 0;
    this.topografia_predio_id = 0;
    this.transporte_urbano_id = 0;
    }
}

export class UsoPredio {
    estado: number;
    id: number;
    prediourb_id:  string;
    razon:  string;
    tipo_usos_id: number;

    // Auditoria de Sincronizacion
    estado_logico: string;
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    constructor() {
    this.estado = 0;
    this.prediourb_id = '00';
    this.razon = '00';
    this.tipo_usos_id = 0;
    }
}

export class ListaUsoPredio extends UsoPredio {
 cmb_tipo_usos_id: ComboBox;
 constructor() {
     super();
     this.cmb_tipo_usos_id = new ComboBox();
 }
}

export class ContribuyentePredio {
    catastrourbano: CatastroUrbano[];
    contribuyentes: Contribuyente[];
}

export class ContribuyenteSelect {
    contribuyente: Contribuyente;
    predios: CatastroUrbano[];
}

export class CatastroUrbano {
    area_construccion: number;
    area_terreno: number;
    avaluo_construccion: number;
    avaluo_propiedad: number;
    avaluo_suelo: number;
    clave: string;
    clave_anterior: string;
    contribuyente_id: number;
    direccion: string;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    constructor() {
    this.area_construccion = 0;
    this.area_terreno  = 0;
    this.avaluo_construccion  = 0;
    this.avaluo_propiedad  = 0;
    this.avaluo_suelo  = 0;
    this.clave  = '';
    this.clave_anterior = '';
    this.contribuyente_id  = 0;
    this.direccion = '';
    }
}

export class Contribuyente {
    id: number;
    identificacion: string;
    nombres: string;
    nombreCompleto: string;
    
    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;
    constructor() {
        this.nombres = '';
        this.identificacion = '';
    }
}

export class Fotografia {
    clave: string;
    foto_predio: any;
    url_foto_predio: any;
    foto_croquis: any;
    url_foto_croquis: any;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    // constructor() {
    //     this.foto_predio: any;
    //     this.url_foto_predio: any;
    //     this.foto_croquis: any;
    //     this.url_foto_croquis: any;
    // }
}

export class CatastroUrbanoForm {
    informacion_basica: InformacionBasica; // Check
    propietario: InformacionPropietario; // Check
    ocupantes: InformacionOcupante; // Check
    datos_predio: DatosPredio; // Check

    // Carateristicas
    uso_predio: ListaUsoPredio[]; // Check
    copropietario: ListaCopropietario[]; // Check

    // Construccion
    datos_adicionales: ListaDatosAdicionales[]; // Check
    tipo_mejora: ListaTipoMejora[]; // Check

    // Fotografia
    fotografia: Fotografia;

    // Auditoria de Sincronizacion
    fecha_modificacion: Date;
    fecha_hora: Date;
    estado_sincronizado: boolean;
    estado_modificado: boolean;
    updated_users: string;

    constructor() {
        this.informacion_basica = new InformacionBasica();
        this.propietario = new InformacionPropietario();
        this.ocupantes = new InformacionOcupante();
        this.datos_predio  = new  DatosPredio();
        // Carateristicas
        this.uso_predio  = []; // [new  ListaUsoPredio()];
        this.copropietario  = []; // new  Copropietario();

        // Construccion
        this.datos_adicionales  = [new  ListaDatosAdicionales()];
        this.tipo_mejora  = [new  ListaTipoMejora()];

    }
}





