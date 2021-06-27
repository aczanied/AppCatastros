import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import {
        ActionSheetController,
        AlertController,
        ModalController,
        Platform,
        LoadingController,
        ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

// Componente de Formulario

// Componente del Selectable
import { IonicSelectableComponent } from 'ionic-selectable';

// import { Combo, Sincronizacion } from '../../../models/generales';

// import {
//   ComboBox,
//   CombosDatosPredio,
// } from '../../../models/catastro-urbano/combo-datos-predio';

import { InicioPage } from '../../../pages/inicio/inicio.page';

// Componentes de la Camara
import {
        Camera,
        CameraOptions,
        PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { AuthService, GeneralService } from '../../../_services/';

import {
  CatastroUrbanoForm,
  InformacionBasica,
  InformacionPropietario,
  InformacionOcupante,
  DatosPredio,
  DatosAdicionales,
  ContribuyentePredio,
  Contribuyente,
  UsoPredio,
  Fotografia,
  ListaDatosAdicionales,
  ListaUsoPredio,
  Copropietario,
  ListaCopropietario,
  TipoMejora,
  ListaTipoMejora,
  Usuarios,
  Tarjeta,
  CombosDatosPredio,
  LocalData,
  diccionario,
  DB,
  ComboBox,
  // tabla
} from './../../../_models';
import { LocaldbService } from 'src/app/_services/helpers/localdb.service';

// import { table } from 'console';

declare var window: any;




@Component({
  selector: 'app-gestion-catastral',
  templateUrl: './gestion-catastral.component.html',
  styleUrls: ['./gestion-catastral.component.scss'],
})

export class GestionCatastralComponent implements OnInit, AfterViewInit, OnDestroy {

  // Entrada del Predio a Editar
  @Input() id;
  @Input() enabled;
  @Input() contribuyenteNombre;
  // private id = '';
  // public enabled = false;
  // Selectable
  public selectedConstruccion = new ListaDatosAdicionales();

  //#region Variables
  // Cards Expandables
  public items: any = [];
  public numeroTarjetas = 8;
  public listaTarjetas: Tarjeta[] = [];
  public tarjeta: Tarjeta = new Tarjeta();
  public catastroUrbanoForm: CatastroUrbanoForm = new CatastroUrbanoForm();
  //#endregion

  //#region  Seccion Combos
  public combos: CombosDatosPredio = new CombosDatosPredio();
  private currentUser: Usuarios;
  
  private tbl: DB = new DB();
  private dbo: LocalData[] = diccionario;

  //#endregion

  constructor(
    private storage: Storage,
    private auth: AuthService,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private toastController: ToastController,
    private plt: Platform,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    private ui: GeneralService,
    private db: LocaldbService,
  ) {
    // Inicializar Componentes
    this.currentUser = this.auth.currentUserValue;
    this.catastroUrbanoForm.informacion_basica = new InformacionBasica();
    this.catastroUrbanoForm.propietario = new InformacionPropietario();
    this.catastroUrbanoForm.ocupantes = new InformacionOcupante();
    //   this.catastroUrbanoForm.ocupantes = new InformacionOcupante();
    this.catastroUrbanoForm.datos_predio = new DatosPredio();
    this.catastroUrbanoForm.datos_adicionales = [new ListaDatosAdicionales()];
    this.catastroUrbanoForm.uso_predio = [new ListaUsoPredio()];
    // // //console.log('xxxxxxx',   this.catastroUrbanoForm.uso_predio);
    this.catastroUrbanoForm.fotografia = new Fotografia();
    // Instacia de las Tarjetas
    this.iniciarTarjetas();
  }

  ngOnInit() {
    // console.log(this.id, this.enabled);
    // DO nothing on init
  }

  ngAfterViewInit(): void {
    this.plt.ready().then(() => {
      // this.presentarPredio();
      this.presentarInformacionBasica();
      this.cargarDatos();
      this.loadStoredImages();
    });
  }

  ngOnDestroy(): void {
    console.log('destruir el componente');
    this.catastroUrbanoForm = new CatastroUrbanoForm();

  }

  // ionInput($event: any) {
  //   this.ui.onlyNumber($event);
  // }

  // disabled
  // isDisabled: boolean = false;
  // declare and initialized variable with true or false

intChecked() {
  this.combos.ckPropiedadHorizontal.selected = !this.combos.ckPropiedadHorizontal.selected;
  // console.log(' el fucking checbox :D',  this.combos.ckPropiedadHorizontal.selected);
  if (this.combos.ckPropiedadHorizontal.selected) {
    this.catastroUrbanoForm.datos_predio.propiedad_horizontal = 1;
    this.combos.ckPropiedadHorizontal.selected = false;
    return true;
  } else {
    this.catastroUrbanoForm.datos_predio.propiedad_horizontal = 0;
    this.combos.ckPropiedadHorizontal.selected = true;
    // console.log('el falso', this.catastroUrbanoForm.datos_predio.propiedad_horizontal);
    return false;
  }

}



//   // camara
  loadStoredImages() {

    
    this.db.buscarPrimerElemento(tabla.foto_predio).then((tabla) => {
      if (!tabla) { 
        return;
      }


        this.catastroUrbanoForm.fotografia = tabla.data.find(c => c.clave === this.id);
        this.catastroUrbanoForm.fotografia.foto_croquis = this.pathForImage(this.catastroUrbanoForm.fotografia.foto_croquis);
        this.catastroUrbanoForm.fotografia.foto_predio = this.pathForImage(this.catastroUrbanoForm.fotografia.foto_predio);
       // console.log('catastroUrbanoForm.fotografia', this.catastroUrbanoForm.fotografia);
    });
  }


  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }


  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }


  async selectImage(option: string) {
    const actionSheet = await this.actionSheetController.create({
        header: 'Seleccionar Imagen',
        buttons: [{
                text: 'Desde la Galería',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, option);
                }
            },
            {
                text: 'Desde la Cámara',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA, option);
                }
            },
            {
                text: 'Cancelar',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}

takePicture(sourceType: PictureSourceType, option: string) {
  const cameraOptions: CameraOptions = {
      quality: 90,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 1080,
      targetHeight: 1024,
  };

  this.camera.getPicture(cameraOptions).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  this.copyFileToLocalDir(correctPath, currentName, this.ui.createFileName(), option );
              });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.ui.createFileName(), option);

      }
  });

}

copyFileToLocalDir(namePath, currentName, newFileName, option: string) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName, option);
  }, error => {
      this.ui.presentToast('Error mientras se actualizaba la imagen.');
  });
}

updateStoredImages(name, option) {
  this.storage.get(tabla.foto_predio).then((tblImagen) => {
  //    const arr = JSON.parse(images);
          if (!tblImagen) { 
            return;
          }

         const filePath = this.file.dataDirectory + name;
         const resPath = this.pathForImage(filePath);
         const imageBase: Fotografia = new Fotografia();
         imageBase.clave = this.catastroUrbanoForm.informacion_basica.clave;
         if (option === 'croquis') {
           imageBase.foto_croquis = filePath;
           imageBase.url_foto_croquis = resPath;
         } else {
           imageBase.foto_predio = filePath;
           imageBase.url_foto_predio = resPath;
         }
         // Auditoria de Sincronizacion
         imageBase.fecha_modificacion = new Date();
         imageBase.fecha_hora = new Date();
         imageBase.estado_sincronizado = false;
         imageBase.estado_modificado = true;
         imageBase.updated_users = this.currentUser.name;

       //   //console.log(images);

         if (tblImagen.data !== null) {
       //    //console.log(images);
       //
          const imgData = tblImagen.data.find( c => c.clave ===  this.catastroUrbanoForm.informacion_basica.clave );
          if (imgData === undefined ) {
            tblImagen.data.push(imageBase);
          } else {
            const idx =  tblImagen.data.findIndex( c => c.clave ===   this.catastroUrbanoForm.informacion_basica.clave );
            if (option === 'croquis') {
              imageBase.foto_croquis = filePath;
              imageBase.url_foto_croquis = resPath;
              imageBase.url_foto_predio = imgData.url_foto_predio;
              imageBase.foto_predio = imgData.foto_predio;
            } else {
              imageBase.foto_croquis = imgData.foto_croquis;
              imageBase.url_foto_croquis = imgData.url_foto_croquis;
              imageBase.url_foto_predio = resPath;
              imageBase.foto_predio = filePath;
            }
            tblImagen.data[idx] = imageBase;
          }
         } else {
          tblImagen.data = [];
          tblImagen.data.push(imageBase);
         }
         // console.log(images);
         this.db.crear(tabla.foto_predio, tblImagen);
         // this.storage.set(tabla.foto_predio, images);
         // Aplicar Formato a las imagenes para presentar
        const cloned = Object.assign({}, imageBase);
        cloned.foto_croquis = this.pathForImage(cloned.foto_croquis);
        cloned.foto_predio = this.pathForImage(cloned.foto_predio);
      //  cloned.url_foto_predio = resPath;

         this.catastroUrbanoForm.fotografia = cloned;
      this.ref.detectChanges(); // trigger change detection cycle
  });
}

  // camera
  abrirCamara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // console.log(imageData);
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // const img = 'data:image/jpeg;base64,' + imageData;
        // window.Ionic.WebView.
        // const img = window.Ionic.WebView.convertFileSrc(imageData);
        //  //console.log(img);
        const currentName = imageData.substr(imageData.lastIndexOf("/") + 1);
        const correctPath = imageData.substr(0, imageData.lastIndexOf("/") + 1);

        this.catastroUrbanoForm.fotografia.foto_predio = correctPath;
      },
      (err) => {
        // Handle error
      }
    );
  }

  // copyToLocalDir(namePath, currentName, newFileName) {
  //   this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName )
  //   .then(_ => {
  //     this.updateStoredImages(newFileName);
  //   },
  //   error => {
  //     //console.log(error);
  //   });
  // }

  // camera croquis
  abrirCamaraCroquis() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        //  // //console.log(imageData);
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // const img = 'data:image/jpeg;base64,' + imageData;
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        // // //console.log(img);
        this.catastroUrbanoForm.fotografia.foto_croquis = img;
      },
      (err) => {
        // Handle error
      }
    );
  }

//   //#region Funciones Generales

  private iniciarTarjetas() {
    for (let index = 0; index < this.numeroTarjetas; index++) {
      const tarjeta: Tarjeta = new Tarjeta();
      this.listaTarjetas.push(tarjeta);
    }
  }

// //#region Presentar Tarjetas

  // Tarjeta Informacion Basica y Tarjeta Otros Datos
    private presentarInformacionBasica() {

      const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.InformacionBasica).tablaBase;
   
      this.db.buscarPrimerElemento(tabla).then((tabla) => {

          // Validamos que haya datos, o la tabla en base
          if (!tabla) {
            // No existe la tabla, instanciamos un objeto
            this.catastroUrbanoForm.informacion_basica = new InformacionBasica();
          } else {
            // Existe la tabla, ahora validar si hay registros en ella
            if (tabla.data.length > 0) {
              // Si Hay Registros,
              // Validamos que el objeto se encuentre en la base
              const objData = tabla.data.find((c) => c.clave === this.id);
              if (objData === undefined) {
                // Sino encontramos, contruimos objeto vacio
                this.catastroUrbanoForm.informacion_basica = new InformacionBasica();
              } else {
                // De lo contrario, asignamos el que viene desde la base.
                this.catastroUrbanoForm.informacion_basica = objData;
              }
            }
          }
          // // // //console.log(this.catastroUrbanoForm.informacion_basica);
          // Cargar Combos
          this.cargarTipoPredio();
          this.cargarCalles();
          this.cargarZonificaciones();
          this.cargarBarrios();
          this.cargarCondominios();
          this.cargarTipoCalles();
          this.cargarClasificacionSuelo();
        });
    }


 // Tarjeta Propietario
    private presentarInformacionPropietario() {
      this.storage
        .get(tabla.informacion_propietario)
        .then((tblInfPropietario) => {

          // Validamos que haya datos, o la tabla en base
          if (!tblInfPropietario) {
            // No existe la tabla, instanciamos un objeto
            this.catastroUrbanoForm.propietario = new InformacionPropietario();
          } else {
            // Existe la tabla, ahora validar si hay registros en ella
            if (tblInfPropietario.data.length > 0) {
              // Si Hay Registros,
              // Validamos que el objeto se encuentre en la base
              const objData = tblInfPropietario.data.find((c) => c.clave === this.id);
              if (objData === undefined) {
                // Sino encontramos, contruimos objeto vacio
                this.catastroUrbanoForm.propietario = new InformacionPropietario();
              } else {
                // De lo contrario, asignamos el que viene desde la base.
                console.log('informacion_desde_base', objData);
                this.catastroUrbanoForm.propietario = objData;
              }
            }
          }
          // // Cargar Combos
          this.cargarContribuyentes();
          this.cargarSituacionPredio();
          this.cargarDominios();
          this.cargarAdquisiciones();
          this.cargarCantones();
          // this.cargarContribuyentes();
        });
    }
 // Tarjeta Hipoteca (Ocupante del Predio)
    private presentarInformacionOcupante() {
      this.storage
        .get(tabla.informacion_ocupante)
        .then((tblInfoOcupante) => {
          // Descomentar // console log para ver la data
          // // // //console.log(data);
          // Validamos que haya datos, o la tabla en base
          if (!tblInfoOcupante) {
            // No existe la tabla, instanciamos un objeto
            this.catastroUrbanoForm.ocupantes = new InformacionOcupante();
          } else {
            // Existe la tabla, ahora validar si hay registros en ella
            if (tblInfoOcupante.data.length > 0) {
              // Si Hay Registros,
              // Validamos que el objeto se encuentre en la base
              const objData = tblInfoOcupante.data.find((c) => c.clave === this.id);
              if (objData === undefined) {
                // Sino encontramos, contruimos objeto vacio
                this.catastroUrbanoForm.ocupantes = new InformacionOcupante();
              } else {
                // De lo contrario, asignamos el que viene desde la base.
                this.catastroUrbanoForm.ocupantes = objData;
              }
            }
          }
          // // //console.log(this.catastroUrbanoForm.ocupantes);
          this.combos.ckPropietario.selected = this.catastroUrbanoForm.ocupantes.oc_propietario;
          this.combos.ckArrendatario.selected = this.catastroUrbanoForm.ocupantes.oc_arrendatario;
          this.combos.ckPosesion.selected = this.catastroUrbanoForm.ocupantes.oc_posesion;
          this.combos.ckGratuito.selected = this.catastroUrbanoForm.ocupantes.oc_titulo_gratuito;
          this.combos.ckNinguno.selected = this.catastroUrbanoForm.ocupantes.oc_ninguno;
          this.combos.ckContratoVigente.selected = this.catastroUrbanoForm.ocupantes.contrato_vigente;
          // // Cargar Combos
        });
    }
 // Tarjeta Datos Predio
    private presentarDatosPredio() {
      this.storage.get(tabla.datos_predio).then((tblDatosPredio) => {
        // //console.log('datos predios alcan',data);
        //  //console.log(data);
        // Validamos que haya datos, o la tabla en base
        if (!tblDatosPredio) {
          // No existe la tabla, instanciamos un objeto
          this.catastroUrbanoForm.datos_predio = new DatosPredio();
        } else {
          // Existe la tabla, ahora validar si hay registros en ella
          if (tblDatosPredio.data.length > 0) {
            // Si Hay Registros,
            // Validamos que el objeto se encuentre en la base
            const objData = tblDatosPredio.data.find((c) => c.clave === this.id);
            if (objData === undefined) {
              // Sino encontramos, contruimos objeto vacio
              this.catastroUrbanoForm.datos_predio = new DatosPredio();
            } else {
              // De lo contrario, asignamos el que viene desde la base.
              this.catastroUrbanoForm.datos_predio = objData;
            }
          }
        }
        // // // // //console.log(this.catastroUrbanoForm.informacion_basica);
        // // Cargar Combos
        this.cargarFormas();
        this.cargarTopografias();
        this.cargarAfectacionTerremoto();
        this.cargarLocalizacion();
        this.cargarAfectacion();
        this.cargarAbastecimientoAgua();
        this.cargarElectricidad();
        this.cargarTransporte();
        this.cargarInternet();
        this.cargarTipoSuelo();
        this.cargarAlumbrados();
        this.cargarRecoleccionBasura();
        this.cargarEstado();

        this.cargarAlcantarillado();
        this.cargarTelefonia();
        this.cargarAseoCalles();

        this.combos.ckBordillo.selected = this.catastroUrbanoForm.datos_predio.tiene_bordillo;
        this.combos.ckAcera.selected = this.catastroUrbanoForm.datos_predio.tiene_acera;
      });
    }
 // Tarjeta Caracteristicas (Copropietarios, Uso del Predio)
    private presentarCopropietario() {
      this.storage.get(tabla.copropietarios).then((tblCopropietario) => {
        if (!tblCopropietario) {
          // No existe la tabla, instanciamos un objeto
          this.catastroUrbanoForm.copropietario = [];
        } else {
          // Existe la tabla, ahora validar si hay registros en ella
          if (tblCopropietario.data.length > 0) {
            // Si Hay Registros,
            // Validamos que el objeto se encuentre en la base
            const listData = tblCopropietario.data.filter((c) => c.prediourb_id === this.id);
            if (listData === undefined) {
              // Sino encontramos, contruimos objeto vacio
              this.catastroUrbanoForm.copropietario = [];
            } else {
              // De lo contrario, asignamos el que viene desde la base.
              this.catastroUrbanoForm.copropietario = listData;
              this.catastroUrbanoForm.copropietario.forEach(
                (c) => (c.cmb_contribuyente_id = new ComboBox())
              );
            }
          }
        }
      });
    }
    private presentarUsoPredio() {
      this.storage.get(tabla.uso_predio).then((tblUsoPredio) => {
        // Descomentar // console log para ver la data
        // // //console.log(data);
        // Validamos que haya datos, o la tabla en base
        if (!tblUsoPredio) {
          // No existe la tabla, instanciamos un objeto
          this.catastroUrbanoForm.uso_predio = [new ListaUsoPredio()];
        } else {
          // Existe la tabla, ahora validar si hay registros en ella
          if (tblUsoPredio.data.length > 0) {
            // Si Hay Registros,
            // Validamos que el objeto se encuentre en la base
            const listData = tblUsoPredio.data.filter((c) => c.prediourb_id === this.id);
            if (listData === undefined) {
              // Sino encontramos, contruimos objeto vacio
              this.catastroUrbanoForm.uso_predio = [new ListaUsoPredio()];
            } else {
              // De lo contrario, asignamos el que viene desde la base.
              this.catastroUrbanoForm.uso_predio = listData;
              this.catastroUrbanoForm.uso_predio.forEach(
                (c) => (c.cmb_tipo_usos_id = new ComboBox())
              );
            }
          }
        }
        // // Cargar Combos
        this.cargarUsoSuelo();
      });
    }
 // Tarjeta Contruccion ((Detalle (Datos Adicionales), Tipo Mejoras)
    private presentarDatosAdicionales() {
      this.storage.get(tabla.detalles).then((tblDatosAdicionales) => {
        // Descomentar // console log para ver la data
      //  //console.log('datos adicionales', data);
        // Validamos que haya datos, o la tabla en base
        if (!tblDatosAdicionales) {
          // No existe la tabla, instanciamos un objeto
          this.catastroUrbanoForm.datos_adicionales = [
            new ListaDatosAdicionales(),
          ];
        } else {
          // Existe la tabla, ahora validar si hay registros en ella
          if (tblDatosAdicionales.data.length > 0) {
            // Si Hay Registros,
            // Validamos que el objeto se encuentre en la base
            const listData = tblDatosAdicionales.data.filter((c) => c.prediourb_id === this.id && c.estado_logico !== 'deleted');
            // console.log(listData);
            if (listData === undefined) {
              // Sino encontramos, contruimos objeto vacio
              this.catastroUrbanoForm.datos_adicionales = [
                new ListaDatosAdicionales(),
              ];
            } else {
              // De lo contrario, asignamos el que viene desde la base.
              listData.forEach((c) => {
                c.cmb_acabado_closet_id = new ComboBox();
                c.cmb_acabado_cubierta_id = new ComboBox();
                c.cmb_acabado_cubventana_id = new ComboBox();
                c.cmb_acabado_escalera_id = new ComboBox();
                c.cmb_acabado_pisos_id = new ComboBox();
                c.cmb_acabado_puertas_id = new ComboBox();
                c.cmb_acabado_revesexte_id = new ComboBox();
                c.cmb_acabado_revesinte_id = new ComboBox();
                c.cmb_acabado_tumbados_id = new ComboBox();
                c.cmb_acabado_ventanas_id = new ComboBox();
                c.cmb_clasificacion_unidad_id = new ComboBox();
                c.cmb_condicion_ocupacion_id = new ComboBox();
                c.cmb_construccion_id = new ComboBox();
                c.cmb_estructura_columna_id = new ComboBox();
                c.cmb_estructura_cubierta_id = new ComboBox();
                c.cmb_estructura_entrepiso_id = new ComboBox();
                c.cmb_estructura_escaleras_id = new ComboBox();
                c.cmb_estructura_paredes_id = new ComboBox();
                c.cmb_estructura_vigascadenas_id = new ComboBox();
                c.cmb_instalacion_banos_id = new ComboBox();
                c.cmb_instalacion_conservacion_id = new ComboBox();
                c.cmb_instalacion_electricas_id = new ComboBox();
                c.cmb_instalacion_especiales_id = new ComboBox();
                c.cmb_instalacion_etapa_id = new ComboBox();
                c.cmb_instalacion_indust_id = new ComboBox();
                c.cmb_instalacion_sanitarias_id = new ComboBox();
                c.cmb_prediourb_id = new ComboBox();
                c.cmb_tipo_ocupantes_id = new ComboBox();
                c.cmb_tipo_usos2_id = new ComboBox();
                c.cmb_tipo_usos_id = new ComboBox();
                c.cmb_tipo_vivienda_id = new ComboBox();
                c.cmb_valor_cultural_id = new ComboBox();
              });
              //  return;
              this.catastroUrbanoForm.datos_adicionales = listData;
            }
          }
        }

        //  // //console.log(this.catastroUrbanoForm.datos_adicionales);
        // // Cargar Combos
        // this.cargarColumnas();
        this.cargarColumnas();
        this.cargarEntrepisos();
        this.cargarCubiertas();
        this.cargarVigasCadenas();
        this.cargarParedes();
        this.cargarEscaleras();

        this.cargarPisos();
        this.cargarRevestimientoExterior();
        this.cargarPuertas();
        this.cargarCubiertasAcabados();
        this.cargarVentanas();
        this.cargarRevestimientoInterior();
        this.cargarTumbados();
        this.cargarCloset();
        this.cargarCubreVentana();
        this.cargarEscalerasAcabado();

        this.cargarSanitarias();
        this.cargarElectricas();
        this.cargarIndustriales();
        this.cargarEtapas();
        this.cargarBanios();
        this.cargarEspeciales();
        this.cargarConservacion();

        this.cargarClasificacionUnidad();
        this.cargarCondicionOcupacion();
        this.cargarTipoOcupantes();
        this.cargarTipoVivienda();
        this.cargarValorCultural();

        this.cargarTipoUsos();
        this.cargarTipoUsosDos();
      });
    }
    private presentarTipoMejora() {
      this.storage.get(tabla.tipo_mejora).then((tblDatosMejora) => {
        // Descomentar // console log para ver la data
        //  //console.log(data);
        //  return;
        // Validamos que haya datos, o la tabla en base
        if (!tblDatosMejora) {
          // No existe la tabla, instanciamos un objeto
          this.catastroUrbanoForm.tipo_mejora = [new ListaTipoMejora()];
        } else {
          // Existe la tabla, ahora validar si hay registros en ella
          if (tblDatosMejora.data.length > 0) {
            // Si Hay Registros,
            // Validamos que el objeto se encuentre en la base
            const listData = tblDatosMejora.data.filter((c) => c.prediourb_id === this.id);
            if (listData === undefined) {
              // Sino encontramos, contruimos objeto vacio
              this.catastroUrbanoForm.tipo_mejora = [new ListaTipoMejora()];
            } else {
              // De lo contrario, asignamos el que viene desde la base.
              this.catastroUrbanoForm.tipo_mejora = listData;
              this.catastroUrbanoForm.tipo_mejora.forEach(
                (c) => (c.cmb_tipo_mejoras_id = new ComboBox())
              );
            }
          }
        }
        this.cargarMejora();
      });
    }
 // Tarjeta Fotos
 private presentarFotografia() {
  this.storage.get(tabla.foto_predio).then((tblFotografia) => {
    // Validamos que haya datos, o la tabla en base
    if (!tblFotografia) {
      // No existe la tabla, instanciamos un objeto
      this.catastroUrbanoForm.fotografia = new Fotografia();
    } else {
      // Existe la tabla, ahora validar si hay registros en ella
      if (tblFotografia.data.length > 0) {
        // Si Hay Registros,
        // Validamos que el objeto se encuentre en la base
        const objData = tblFotografia.data.find((c) => c.clave === this.id);
        if (objData === undefined) {
          // Sino encontramos, contruimos objeto vacio
          this.catastroUrbanoForm.fotografia = new Fotografia();
        } else {
          // De lo contrario, asignamos el que viene desde la base.
          this.catastroUrbanoForm.fotografia = objData;
        }
      }
    }
  });
}
//#endregion


  async agregarCopropietario(prediourb_id: string) {
    // //console.log('llega', prediourb_id);
    const copropietario = new ListaCopropietario();
    copropietario.id =
      Math.max.apply(
        Math,
        this.catastroUrbanoForm.copropietario.map(function (o) {
          return o.id;
        })
      ) + 1;
    copropietario.estado_logico = 'added';
    copropietario.prediourb_id = prediourb_id;
    this.catastroUrbanoForm.copropietario.push(copropietario);
    copropietario.cmb_contribuyente_id = new ComboBox();
  }

  async eliminarCopropietario(id: number, idx: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '¿Seguro?',
      message: 'Se eliminará el Copropietario seleccionado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

            this.ui.presentToast('Acción Cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (
              this.catastroUrbanoForm.copropietario[idx].estado_logico ===
              'added'
            ) {
              this.storage.get(tabla.copropietarios)
                .then((tblCopropietario) => {
                  const idx2 = tblCopropietario.data.findIndex(
                    (item) =>
                      item.prediourb_id ===
                        this.catastroUrbanoForm.copropietario[idx]
                          .prediourb_id &&
                      item.id === this.catastroUrbanoForm.copropietario[idx].id
                  );
                  if (idx2 > 0) {
                    // No se encuentra coindicencia, entonces se agrega.
                    tblCopropietario.data.splice(idx2, 1);
                    this.db.crear(tabla.copropietarios, tblCopropietario);
                   // this.storage.set(tabla.copropietarios, data);
                  }
                  this.catastroUrbanoForm.copropietario.splice(idx, 1);
                });
            } else {
              this.catastroUrbanoForm.copropietario.find(
                (c) => c.id === id
              ).estado_logico = 'deleted';
            }

            this.ui.presentToast('Copropietario eliminado.');
          },
        },
      ],
    });

    await alert.present();
  }

  async agregarTipoMejora(prediourb_id: string) {
    const tipomejora = new ListaTipoMejora();
    tipomejora.id =
      Math.max.apply(
        Math,
        this.catastroUrbanoForm.tipo_mejora.map(function (o) {
          return o.id;
        })
      ) + 1;
    tipomejora.estado_logico = "added";
    tipomejora.prediourb_id = prediourb_id;
    this.catastroUrbanoForm.tipo_mejora.push(tipomejora);
  }

  async eliminarTipoMejora(id: number, idx: number) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // header: '¿Seguro?',
      message: "Se eliminará el Tipo de Mejora seleccionado",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.ui.presentToast("Acción Cancelada");
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (
              this.catastroUrbanoForm.tipo_mejora[idx].estado_logico === 'added'
            ) {
              this.storage.get(tabla.tipo_mejora).then((data: TipoMejora[]) => {
                const idx2 = data.findIndex(
                  (item) =>
                    item.prediourb_id ===
                      this.catastroUrbanoForm.tipo_mejora[idx].prediourb_id &&
                    item.id === this.catastroUrbanoForm.tipo_mejora[idx].id
                );
                if (idx2 > 0) {
                  // No se encuentra coindicencia, entonces se agrega.
                  data.splice(idx2, 1);
                  this.storage.set(tabla.tipo_mejora, data);
                }
                this.catastroUrbanoForm.tipo_mejora.splice(idx, 1);
              });
            } else {
              this.catastroUrbanoForm.tipo_mejora.find(
                (c) => c.id === id
              ).estado_logico = 'deleted';
            }

            this.ui.presentToast('Tipo Mejora eliminado.');
          },
        },
      ],
    });

    await alert.present();
  }

  async agregarUsoPredio(prediourb_id: string) {
    const usopredio = new ListaUsoPredio();
    usopredio.id =
      Math.max.apply(
        Math,
        this.catastroUrbanoForm.uso_predio.map(function (o) {
          return o.id;
        })
      ) + 1;
    usopredio.estado_logico = 'added';
    usopredio.prediourb_id = prediourb_id;
    this.catastroUrbanoForm.uso_predio.push(usopredio);
  }

  async eliminarUsoPredio(id: number, idx: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '¿Seguro?',
      message: 'Se eliminará el Uso del Predio seleccionado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.ui.presentToast('Acción Cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (
              this.catastroUrbanoForm.uso_predio[idx].estado_logico === 'added'
            ) {

              this.storage.get(tabla.uso_predio).then((data: UsoPredio[]) => {
                const idx2 = data.findIndex(
                  (item) =>
                    item.prediourb_id ===
                      this.catastroUrbanoForm.uso_predio[idx].prediourb_id &&
                    item.id === this.catastroUrbanoForm.uso_predio[idx].id
                );
                if (idx2 > 0) {
                  data.splice(idx2, 1);
                  this.storage.set(tabla.uso_predio, data);
                }
                this.catastroUrbanoForm.uso_predio.splice(idx, 1);
              });
            } else {
              this.catastroUrbanoForm.uso_predio.find(
                (c) => c.id === id
              ).estado_logico = 'deleted';
            }

            this.ui.presentToast('Uso del Predio eliminado.');
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarObrasMejorasPredio(idx: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '¿Seguro?',
      message: 'Se eliminará el Copropietario seleccionado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.ui.presentToast('Acción Cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            //  // //console.log(idx);
            // this.catastroUrbanoForm.uso_predio.find(c => c.id === idx).estado_logico = 'deleted';
            this.ui.presentToast('Copropietario eliminado.');
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarDatosConstruccion(idx: string, clave: string) {
    // //console.log(obj);
    // return;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '¿Seguro?',
      message: 'Se eliminarán los Datos de la Construcción seleccionada',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.ui.presentToast('Acción Cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            //  // //console.log(idx);
            this.catastroUrbanoForm.datos_adicionales.find(
              (c) => c.construccion_id === idx && c.prediourb_id === clave
            ).estado_logico = 'deleted';
            // //console.log(idx);
            this.ui.presentToast('Datos de la Construcción eliminados.');
           
          },
        },
      ],
    });

    await alert.present();
  }

  isModifiedDetalle(idx: number) {
    console.log('el idx de detalle', idx);
    if (this.catastroUrbanoForm.datos_adicionales[idx].estado_logico !== 'added') {
      this.catastroUrbanoForm.datos_adicionales[idx].estado_logico = 'modified';
    }
  }

//   grabarInformacionBasica() {

//     if (this.combos.cmbTipoPredio.selected !== undefined) {
//       if (this.combos.cmbTipoPredio.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.tipo_predio_id = this.combos.cmbTipoPredio.selected.id;
//     }
//   }

//     if (this.combos.cmbCallePrincipal.selected !== undefined) {
//       if (this.combos.cmbCallePrincipal.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.calle_principal_id = this.combos.cmbCallePrincipal.selected.id;
//     }
//   }

//     if (this.combos.cmbInteseccionUno.selected !== undefined) {
//       if (this.combos.cmbInteseccionUno.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.interseccion1_id = this.combos.cmbInteseccionUno.selected.id;
//     }
//   }

//     if (this.combos.cmbInteseccionDos.selected !== undefined) {
//       if (this.combos.cmbInteseccionDos.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.interseccion2_id = this.combos.cmbInteseccionDos.selected.id;
//     }
//   }

//     if (this.combos.cmbZonificaciones.selected !== undefined) {
//       if (this.combos.cmbZonificaciones.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.zonificacion_predio_id = this.combos.cmbZonificaciones.selected.id;
//     }
//   }

//     if (this.combos.cmbBarrios.selected !== undefined) {
//       if (this.combos.cmbBarrios.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.ciudadela_predio_id = this.combos.cmbBarrios.selected.id;
//     }
//   }

//     if (this.combos.cmbCondominios.selected !== undefined) {
//       if (this.combos.cmbCondominios.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.condominio_predio_id = this.combos.cmbCondominios.selected.id;
//     }
//   }

//     if (this.combos.cmbTipoCalles.selected !== undefined) {
//       if (this.combos.cmbTipoCalles.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.tipo_via_id = this.combos.cmbTipoCalles.selected.id;
//     }
//   }

//     if (this.combos.cmbClasificacionSuelo.selected !== undefined) {
//       if (this.combos.cmbClasificacionSuelo.selected.id !== undefined) {
//       this.catastroUrbanoForm.informacion_basica.clasificacion_suelo_id = this.combos.cmbClasificacionSuelo.selected.id;
//     }
//   }

//     this.storage.get(tabla.informacion_basica).then((data) => {
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.informacion_basica.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.informacion_basica.estado_modificado = true;
//       this.catastroUrbanoForm.informacion_basica.updated_users = this.currentUser.name;
//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.informacion_basica.clave
//         );
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.informacion_basica);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.informacion_basica;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.informacion_basica, data);
//         this.marcarModificado();
//         this.ui.presentToast('Informacion Basica Grabado');
//       } else {
//         const dataInit: InformacionBasica[] = [];
//         dataInit.push(this.catastroUrbanoForm.informacion_basica);
//         this.storage.set(tabla.informacion_basica, dataInit);
//       }
//     });
//   }
//  marcarModificado() {
//   this.storage.get(tabla.verificar_pendientes).then((verifica: Sincronizacion) => {
//     verifica.pendiente_sincronizar = true;
//     this.storage.set(tabla.verificar_pendientes, verifica);
//   });
//  }


//   grabarOtrosDatos() {
//     this.storage.get(tabla.informacion_basica).then((data) => {
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.informacion_basica.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.informacion_basica.estado_modificado = true;
//       this.catastroUrbanoForm.informacion_basica.updated_users = this.currentUser.name;
//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.informacion_basica.clave
//         );
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.informacion_basica);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.informacion_basica;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.informacion_basica, data);
//         this.marcarModificado();
//         this.ui.presentToast('Otros Datos Grabado');
//       } else {
//         const dataInit: InformacionBasica[] = [];
//         dataInit.push(this.catastroUrbanoForm.informacion_basica);
//         this.storage.set(tabla.informacion_basica, dataInit);
//       }
//     });
//   }

//   grabarFotos() {
//         this.marcarModificado();
//         this.ui.presentToast('Fotos Predio Grabado');
//   }

//   grabarInformacionPropietario() {
//     if (this.combos.cmbPropietario.selected !== undefined) {
//       if (this.combos.cmbPropietario.selected.id !== undefined) {
//       this.catastroUrbanoForm.propietario.contribuyente_id = this.combos.cmbPropietario.selected.id;
//       }
//     }

//     if (this.combos.cmbPropietarioAnt.selected !== undefined) {
//       // TODO: Agregar esta validacion a todos los combos
//       if (this.combos.cmbPropietarioAnt.selected.id !== undefined) {
//         this.catastroUrbanoForm.propietario.propietario_anterior_id = this.combos.cmbPropietarioAnt.selected.id;
//       }
//     }

//     if (this.combos.cmbSituacionPredio.selected !== undefined) {
//       if (this.combos.cmbSituacionPredio.selected.id !== undefined) {
//       this.catastroUrbanoForm.propietario.situacion_predio_id = this.combos.cmbSituacionPredio.selected.id;
//     }
//   }

//     if (this.combos.cmbDominios.selected !== undefined) {
//       if (this.combos.cmbDominios.selected.id !== undefined) {
//       this.catastroUrbanoForm.propietario.dominio_predio_id = this.combos.cmbDominios.selected.id;
//     }
//   }

//     if (this.combos.cmbAdquisiciones.selected !== undefined) {
//       if (this.combos.cmbAdquisiciones.selected.id !== undefined) {
//       this.catastroUrbanoForm.propietario.adquisicion_predio_id = this.combos.cmbAdquisiciones.selected.id;
//     }
//   }

//     if (this.combos.cmbCantones.selected !== undefined) {
//       if (this.combos.cmbCantones.selected.id !== undefined) {
//       this.catastroUrbanoForm.propietario.canton_id = this.combos.cmbCantones.selected.id;
//     }
//   }

//     this.storage.get(tabla.informacion_propietario).then((data) => {
//       // //console.log('la tablaa', tabla.informacion_propietario);
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.propietario.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.propietario.estado_modificado = true;
//       this.catastroUrbanoForm.propietario.updated_users = this.currentUser.name;
//       // Asignar al Objeto de Base de Datos

//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.propietario.clave
//         );
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.propietario);
//         } else {
//           // Caso contrario modifico el registro.
//           console.log('propietario', this.catastroUrbanoForm.propietario);
//           data[idx] = this.catastroUrbanoForm.propietario;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.informacion_propietario, data);
//         this.marcarModificado();
//         this.ui.presentToast('Informacion Propietario Grabado');
//       } else {
//         const dataInit: InformacionPropietario[] = [];
//         dataInit.push(this.catastroUrbanoForm.propietario);
//         this.storage.set(tabla.informacion_propietario, dataInit);
//       }
//     });
//   }

//   grabarInformacionHipoteca() {
//     this.storage.get(tabla.informacion_ocupante).then((data) => {
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.ocupantes.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.ocupantes.estado_modificado = true;
//       this.catastroUrbanoForm.ocupantes.updated_users = this.currentUser.name;

//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.ocupantes.clave
//         );
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.ocupantes);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.ocupantes;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.informacion_ocupante, data);
//         this.marcarModificado();
//         this.ui.presentToast('Informacion Hipoteca Grabado');
//       } else {
//         const dataInit: InformacionOcupante[] = [];
//         dataInit.push(this.catastroUrbanoForm.ocupantes);
//         this.storage.set(tabla.informacion_ocupante, dataInit);
//       }
//     });
//   }

//   grabarUsoPredio() {
//     this.storage.get(tabla.uso_predio).then((data: UsoPredio[]) => {
//       // console.log('grabar uso predio', this.catastroUrbanoForm.uso_predio);
//       this.catastroUrbanoForm.uso_predio.forEach((c) => {
//         if (c.cmb_tipo_usos_id.selected !== undefined) { 
//           if (c.cmb_tipo_usos_id.selected.id !== undefined) { 
//           c.tipo_usos_id = c.cmb_tipo_usos_id.selected.id;
//         }
//       }
//         // Setear Campos de auditoria
//         c.fecha_modificacion = new Date();
//         c.estado_modificado = true;
//         c.updated_users = this.currentUser.name;
//         // Asignar al Objeto de Base de Datos
//         const objData: UsoPredio = {
//           estado: c.estado,
//           estado_sincronizado: c.estado_sincronizado,
//           estado_logico: c.estado_logico,
//           fecha_hora: c.fecha_hora,
//           fecha_modificacion: c.fecha_modificacion,
//           id: c.id,
//           prediourb_id: c.prediourb_id,
//           razon: c.razon,
//           tipo_usos_id: c.tipo_usos_id,
//           estado_modificado: c.estado_modificado,
//           updated_users: c.updated_users,
//         };
//         //  // //console.log(objData);
//         // Buscar en la base si el registro no es nuevo
//         // if (objData.estado_logico === 'added') {

//         //   data.push(objData);
//         // } else {
//         const idx = data.findIndex(
//           (item) =>
//             item.prediourb_id === objData.prediourb_id && item.id === objData.id
//         );
//         // console.log('el idx', idx);
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(objData);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = objData;
//         }
//         // }
//       });
//       this.storage.set(tabla.uso_predio, data);
//       this.marcarModificado();
//       this.ui.presentToast('Informacion Uso del Predio Grabado');
//     });
//   }

//   isModifiedUsoPredio(idx: number) {
//     if (this.catastroUrbanoForm.uso_predio[idx].estado_logico !== 'added') {
//       this.catastroUrbanoForm.uso_predio[idx].estado_logico = 'modified';
//     }
//   }

//   grabarTipoMejora() {
//     this.storage.get(tabla.tipo_mejora).then((data: TipoMejora[]) => {
//       this.catastroUrbanoForm.tipo_mejora.forEach((c) => {
//         if (c.cmb_tipo_mejoras_id.selected !== undefined) {
//           if (c.cmb_tipo_mejoras_id.selected.id !== undefined) {
//           c.tipo_mejoras_id = c.cmb_tipo_mejoras_id.selected.id;
//         }
//       }
//         // Setear Campos de auditoria
//         c.fecha_modificacion = new Date();
//         c.estado_modificado = true;
//         c.updated_users = this.currentUser.name;
//         // Asignar al Objeto de Base de Datos
//         const objData: TipoMejora = {
//           estado: c.estado,
//           cantidad: c.cantidad,
//           tipo_mejoras_id: c.tipo_mejoras_id,
//           id: c.id,
//           prediourb_id: c.prediourb_id,

//           estado_sincronizado: c.estado_sincronizado,
//           estado_logico: c.estado_logico,
//           fecha_hora: c.fecha_hora,
//           fecha_modificacion: c.fecha_modificacion,
//           estado_modificado: c.estado_modificado,
//           updated_users: c.updated_users,
//         };
//         //  // //console.log(objData);
//         // Buscar en la base si el registro no es nuevo
//       //   if (objData.estado_logico === "added") {
//       //     data.push(objData);
//       //   } else {
//       //     const idx = data.findIndex(
//       //       (item) =>
//       //         item.prediourb_id === objData.prediourb_id &&
//       //         item.id === objData.id
//       //     );
//       //     if (idx < 0) {
//       //       // No se encuentra coindicencia, entonces se agrega.
//       //       data.push(objData);
//       //     } else {
//       //       // Caso contrario modifico el registro.
//       //       data[idx] = objData;
//       //     }
//       //   }
//       // });

//       const idx = data.findIndex(
//         (item) =>
//           item.prediourb_id === objData.prediourb_id && item.id === objData.id
//       );
//       if (idx < 0) {
//         // No se encuentra coindicencia, entonces se agrega.
//         data.push(objData);
//       } else {
//         // Caso contrario modifico el registro.
//         data[idx] = objData;
//       }
//       // }
//     });

    
//       this.storage.set(tabla.tipo_mejora, data);
//       this.marcarModificado();
//       this.ui.presentToast('Informacion Tipo Mejora Grabado');
//     });
//   }

//   isModifiedTipoMejora(idx: number) {
//     if (this.catastroUrbanoForm.tipo_mejora[idx].estado_logico !== 'added') {
//       this.catastroUrbanoForm.tipo_mejora[idx].estado_logico = 'modified';
//     }
//   }

//   grabarCopropietario() {
//     this.storage.get(tabla.copropietarios).then((data: Copropietario[]) => {
//       this.catastroUrbanoForm.copropietario.forEach((c) => {
//         if (c.cmb_contribuyente_id.selected !== undefined) {
//           if (c.cmb_contribuyente_id.selected.id !== undefined) {
//           c.contribuyente_id = c.cmb_contribuyente_id.selected.id;
//         }
//       }
//         // Setear Campos de auditoria
//         c.fecha_modificacion = new Date();
//         c.estado_modificado = true;
//         c.updated_users = this.currentUser.name;
//         // if (c.estado_logico === "added" || c.estado_logico === "deleted") {
//         //   // Do Nothing
//         // } else {
//         //   c.estado_logico = "modified";
//         // }
//         // Asignar al Objeto de Base de Datos
//         const objData: Copropietario = {
//           contribuyente_id: c.contribuyente_id,
//           estado: c.estado,
//           id: c.id,
//           porcentaje: c.porcentaje,
//           prediourb_id: c.prediourb_id,

//           // Auditoria de Sincronizacion
//           estado_logico: c.estado_logico,
//           fecha_modificacion: c.fecha_modificacion,
//           fecha_hora: c.fecha_hora,
//           estado_sincronizado: c.estado_sincronizado,
//           estado_modificado: c.estado_modificado,
//           updated_users: c.updated_users,
//         };
//         //  // //console.log(objData);
//         // Buscar en la base si el registro no es nuevo
//         // if (objData.estado_logico === "added") {
//         //   data.push(objData);
//         // } else {
//         //   //console.log(objData);
//         //   const idx = data.findIndex(
//         //     (item) =>
//         //       item.prediourb_id === objData.prediourb_id &&
//         //       item.id === objData.id
//         //   );
//         //   if (idx < 0) {
//         //     // No se encuentra coindicencia, entonces se agrega.
//         //     data.push(objData);
//         //   } else {
//         //     // Caso contrario modifico el registro.
//         //     data[idx] = objData;
//         //   }
//         // };

//       const idx = data.findIndex(
//         (item) =>
//           item.prediourb_id === objData.prediourb_id && item.id === objData.id
//       );
//       if (idx < 0) {
//         // No se encuentra coindicencia, entonces se agrega.
//         data.push(objData);
//       } else {
//         // Caso contrario modifico el registro.
//         data[idx] = objData;
//       }
//       // }
//     });
//       this.storage.set(tabla.copropietarios, data);
//       this.marcarModificado();
//       this.ui.presentToast('Informacion Datos Copropietarios Grabado');
//     });
//   }

//   isModifiedCopropietario(idx: number) {
//     if (this.catastroUrbanoForm.copropietario[idx].estado_logico !== 'added') {
//       this.catastroUrbanoForm.copropietario[idx].estado_logico = 'modified';
//     }
//   }


//   // grabarUsoPredio() {
//   //   // this.grabarUsoPredioFn();
//   // }

//   // grabarCopropietario() {
//   //   this.grabarCopropietarioFn();
//   // }

//   grabarCaracteristicas() {
//     this.grabarUsoPredio();
//     this.grabarCopropietario();
//   }

//   grabarDatosPredio() {
//     if (this.combos.cmbFormas.selected !== undefined) {
//       if (this.combos.cmbFormas.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.forma_predio_id = this.combos.cmbFormas.selected.id;
//     }
//   }

//     if (this.combos.cmbTopografias.selected !== undefined) {
//       if (this.combos.cmbTopografias.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.topografia_predio_id = this.combos.cmbTopografias.selected.id;
//     }
//   }

//     if (this.combos.cmbAfectacionTerremoto.selected !== undefined) {
//       if (this.combos.cmbAfectacionTerremoto.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.afectacion_terremoto_id = this.combos.cmbAfectacionTerremoto.selected.id;
//     }
//   }

//     if (this.combos.cmbLocalizacion.selected !== undefined) {
//       if (this.combos.cmbLocalizacion.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.localizacion_predio_id = this.combos.cmbLocalizacion.selected.id;
//     }
//   }

//     if (this.combos.cmbAfectacion.selected !== undefined) {
//       if (this.combos.cmbAfectacion.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.afectacion_predio_id = this.combos.cmbAfectacion.selected.id;
//     }
//   }

//     if (this.combos.cmbAbastecimientoAgua.selected !== undefined) {
//       if (this.combos.cmbAbastecimientoAgua.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.abastecimiento_agua_id = this.combos.cmbAbastecimientoAgua.selected.id;
//     }
//   }

//     if (this.combos.cmbElectricidad.selected !== undefined) {
//       if (this.combos.cmbElectricidad.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.energia_electrica_id = this.combos.cmbElectricidad.selected.id;
//     }
//   }

//     if (this.combos.cmbTransporte.selected !== undefined) {
//       if (this.combos.cmbTransporte.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.transporte_urbano_id = this.combos.cmbTransporte.selected.id;
//     }
//   }

//     if (this.combos.cmbInternet.selected !== undefined) {
//       if (this.combos.cmbInternet.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.internet_predio_id = this.combos.cmbInternet.selected.id;
//     }
//   }

//     if (this.combos.cmbTipoSuelo.selected !== undefined) {
//       if (this.combos.cmbTipoSuelo.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.tipo_suelo_id = this.combos.cmbTipoSuelo.selected.id;
//     }
//   }

//     if (this.combos.cmbAlumbrados.selected !== undefined) {
//       if (this.combos.cmbAlumbrados.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.alumbrado_predio_id = this.combos.cmbAlumbrados.selected.id;
//     }
//   }

//     if (this.combos.cmbRecoleccionBasura.selected !== undefined) {
//       if (this.combos.cmbRecoleccionBasura.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.recoleccion_basura_id = this.combos.cmbRecoleccionBasura.selected.id;
//     }
//   }

//     if (this.combos.cmbEstado.selected !== undefined) {
//       if (this.combos.cmbEstado.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.estado_predio_id = this.combos.cmbEstado.selected.id;
//     }
//   }

//     if (this.combos.cmbAlcantarillado.selected !== undefined) {
//       if (this.combos.cmbAlcantarillado.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.alcantarillado_predio_id = this.combos.cmbAlcantarillado.selected.id;
//     }
//   }

//     if (this.combos.cmbTelefonia.selected !== undefined) {
//       if (this.combos.cmbTelefonia.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.telefonia_predio_id = this.combos.cmbTelefonia.selected.id;
//     }
//   }

//     if (this.combos.cmbAseoCalles.selected !== undefined) {
//       if (this.combos.cmbAseoCalles.selected.id !== undefined) {
//       this.catastroUrbanoForm.datos_predio.aseo_predio_id = this.combos.cmbAseoCalles.selected.id;
//     }
//   }

//     // (change)="catastroUrbanoForm.informacion_basica.clave_anterior = $event.target.value"

//     this.storage.get(tabla.datos_predio).then((data) => {
//       // //console.log('datos predios alcan',data);
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.datos_predio.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.datos_predio.estado_modificado = true;
//       this.catastroUrbanoForm.datos_predio.updated_users = this.currentUser.name;

//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.datos_predio.clave
//         );
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.datos_predio);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.datos_predio;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.datos_predio, data);
//         this.marcarModificado();
//         this.ui.presentToast('Informacion Datos Predio Grabado');
//       } else {
//         const dataInit: DatosPredio[] = [];
//         dataInit.push(this.catastroUrbanoForm.datos_predio);
//         this.storage.set(tabla.datos_predio, dataInit);
//       }
//     });
//   }

//   seleccionarConstruccion(id: any, $event: any) {
//     // // //console.log($event);
//     this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
//       if (c.construccion_id === id) {
//         //  this.selectedConstruccion = c;
//         c.checked = true;
//         // // //console.log('si click',c);
//       } else {
//         c.checked = false;
//         // // //console.log('no click',c);
//       }
//     });
//     //  this.selectedConstruccion =  this.catastroUrbanoForm.datos_adicionales.find(c => c.id === id);
//   }

//   limpiarPropietario() {
//     // //console.log('llego');
//     this.combos.cmbPropietario.selected = new ComboBox();
//   }

//   limpiarPropietarioAnt() {
//     // //console.log('llego');
//     this.combos.cmbPropietarioAnt.selected = new ComboBox();
//   }

//   grabarConstruccion() {
//     //  console.log('grabar cons', this.catastroUrbanoForm.datos_adicionales);
//     this.catastroUrbanoForm.datos_adicionales.forEach((c) => {

//       if (c.cmb_tipo_usos_id.selected !== undefined) {
//         if (c.cmb_tipo_usos_id.selected.id !== undefined) {
//         c.tipo_usos_id = c.cmb_tipo_usos_id.selected.id;
//       }
//     }

//       if (c.cmb_tipo_usos2_id.selected !== undefined) {
//         if (c.cmb_tipo_usos_id.selected.id !== undefined) {
//         c.tipo_usos2_id = c.cmb_tipo_usos2_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_columna_id.selected !== undefined) {
//         if (c.cmb_estructura_columna_id.selected.id !== undefined) {
//         c.estructura_columna_id = c.cmb_estructura_columna_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_entrepiso_id.selected !== undefined) {
//         if (c.cmb_estructura_entrepiso_id.selected.id !== undefined) {
//         c.estructura_entrepiso_id = c.cmb_estructura_entrepiso_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_cubierta_id.selected !== undefined) {
//         if (c.cmb_estructura_cubierta_id.selected.id !== undefined) {
//         c.estructura_cubierta_id = c.cmb_estructura_cubierta_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_vigascadenas_id.selected !== undefined) {
//         if (c.cmb_estructura_vigascadenas_id.selected.id !== undefined) {
//         c.estructura_vigascadenas_id =
//           c.cmb_estructura_vigascadenas_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_paredes_id.selected !== undefined) {
//         if (c.cmb_estructura_paredes_id.selected.id !== undefined) {
//         c.estructura_paredes_id = c.cmb_estructura_paredes_id.selected.id;
//       }
//     }

//       if (c.cmb_estructura_escaleras_id.selected !== undefined) {
//         if (c.cmb_estructura_escaleras_id.selected.id !== undefined) {
//         c.estructura_escaleras_id = c.cmb_estructura_escaleras_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_escalera_id.selected !== undefined) {
//         if (c.cmb_acabado_escalera_id.selected.id !== undefined) {
//         c.acabado_escalera_id = c.cmb_acabado_escalera_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_pisos_id.selected !== undefined) {
//         if (c.cmb_acabado_pisos_id.selected.id !== undefined) {
//         c.acabado_pisos_id = c.cmb_acabado_pisos_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_revesexte_id.selected !== undefined) {
//         if (c.cmb_acabado_revesexte_id.selected.id !== undefined) {
//         c.acabado_revesexte_id = c.cmb_acabado_revesexte_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_puertas_id.selected !== undefined) {
//         if (c.cmb_acabado_puertas_id.selected.id !== undefined) {
//         c.acabado_puertas_id = c.cmb_acabado_puertas_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_cubierta_id.selected !== undefined) {
//         if (c.cmb_acabado_cubierta_id.selected.id !== undefined) {
//         c.acabado_cubierta_id = c.cmb_acabado_cubierta_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_ventanas_id.selected !== undefined) {
//         if (c.cmb_acabado_ventanas_id.selected.id !== undefined) {
//         c.acabado_ventanas_id = c.cmb_acabado_ventanas_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_revesinte_id.selected !== undefined) {
//         if (c.cmb_acabado_revesinte_id.selected.id !== undefined) {
//         c.acabado_revesinte_id = c.cmb_acabado_revesinte_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_tumbados_id.selected !== undefined) {
//         if (c.cmb_acabado_tumbados_id.selected.id !== undefined) {
//         c.acabado_tumbados_id = c.cmb_acabado_tumbados_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_closet_id.selected !== undefined) {
//         if (c.cmb_acabado_closet_id.selected.id !== undefined) {
//         c.acabado_closet_id = c.cmb_acabado_closet_id.selected.id;
//       }
//     }

//       if (c.cmb_acabado_cubventana_id.selected !== undefined) {
//         if (c.cmb_acabado_cubventana_id.selected.id !== undefined) {
//         c.acabado_cubventana_id = c.cmb_acabado_cubventana_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_sanitarias_id.selected !== undefined) {
//         if (c.cmb_instalacion_sanitarias_id.selected.id !== undefined) {
//         c.instalacion_sanitarias_id =
//           c.cmb_instalacion_sanitarias_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_electricas_id.selected !== undefined) {
//         if (c.cmb_instalacion_electricas_id.selected.id !== undefined) {
//         c.instalacion_electricas_id =
//           c.cmb_instalacion_electricas_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_indust_id.selected !== undefined) {
//         if (c.cmb_instalacion_indust_id.selected.id !== undefined) {
//         c.instalacion_indust_id = c.cmb_instalacion_indust_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_etapa_id.selected !== undefined) {
//         if (c.cmb_instalacion_etapa_id.selected.id !== undefined) {
//         c.instalacion_etapa_id = c.cmb_instalacion_etapa_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_banos_id.selected !== undefined) {
//         if (c.cmb_instalacion_banos_id.selected.id !== undefined) {
//         c.instalacion_banos_id = c.cmb_instalacion_banos_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_especiales_id.selected !== undefined) {
//         if (c.cmb_instalacion_especiales_id.selected.id !== undefined) {
//         c.instalacion_especiales_id =
//           c.cmb_instalacion_especiales_id.selected.id;
//       }
//     }

//       if (c.cmb_instalacion_conservacion_id.selected !== undefined) {
//         if (c.cmb_instalacion_conservacion_id.selected.id !== undefined) {
//         c.instalacion_conservacion_id =
//           c.cmb_instalacion_conservacion_id.selected.id;
//       }
//     }

//       if (c.cmb_clasificacion_unidad_id.selected !== undefined) {
//         if (c.cmb_clasificacion_unidad_id.selected.id !== undefined) {
//         c.clasificacion_unidad_id = c.cmb_clasificacion_unidad_id.selected.id;
//       }
//     }

//       if (c.cmb_condicion_ocupacion_id.selected !== undefined) {
//         if (c.cmb_condicion_ocupacion_id.selected.id !== undefined) {
//         // // //console.log(c.cmb_condicion_ocupacion_id.selected);
//         c.condicion_ocupacion_id = c.cmb_condicion_ocupacion_id.selected.id;
//       }
//     }

//       if (c.cmb_tipo_ocupantes_id.selected !== undefined) {
//         if (c.cmb_tipo_ocupantes_id.selected.id !== undefined) {
//         c.tipo_ocupantes_id = c.cmb_tipo_ocupantes_id.selected.id;
//       }
//     }

//       if (c.cmb_tipo_vivienda_id.selected !== undefined) {
//         if (c.cmb_tipo_vivienda_id.selected.id !== undefined) {
//         c.tipo_vivienda_id = c.cmb_tipo_vivienda_id.selected.id;
//       }
//     }

//       if (c.cmb_valor_cultural_id.selected !== undefined) {
//         if (c.cmb_valor_cultural_id.selected.id !== undefined) {
//         c.valor_cultural_id = c.cmb_valor_cultural_id.selected.id;
//       }
//     }
//     });

//     // (change)="catastroUrbanoForm.informacion_basica.clave_anterior = $event.target.value"

//     this.storage.get(tabla.detalles).then((data: DatosAdicionales[]) => {
//       this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
//         // Setear Campos de auditoria
//         c.fecha_modificacion = new Date();
//         c.estado_modificado = true;
//         c.updated_users = this.currentUser.name;
//         c.estado_sincronizado = false;
//         if (c.estado_logico === 'added' || c.estado_logico === 'deleted') {
//           // Do Nothing
//         } else {
//           c.estado_logico = 'modified';
//         }
//         // //console.log(c);
//         let objData: DatosAdicionales = new DatosAdicionales();
//         objData = {
//           checked: c.checked,
//           bloque: c.bloque,
//           piso: c.piso,
//           departamento: c.departamento,
//           estado_logico: c.estado_logico,
//           acabado_closet_id: c.acabado_closet_id,
//           acabado_cubierta_id: c.acabado_cubierta_id,
//           acabado_cubventana_id: c.acabado_cubventana_id,
//           acabado_escalera_id: c.acabado_escalera_id,
//           acabado_pisos_id: c.acabado_pisos_id,
//           acabado_puertas_id: c.acabado_puertas_id,
//           acabado_revesexte_id: c.acabado_revesexte_id,
//           acabado_revesinte_id: c.acabado_revesinte_id,
//           acabado_tumbados_id: c.acabado_tumbados_id,
//           acabado_ventanas_id: c.acabado_ventanas_id,
//           anio_const: c.anio_const,
//           area_const: c.area_const,
//           cant_banos: c.cant_banos,
//           cant_celulares: c.cant_celulares,
//           cant_dormitorios: c.cant_dormitorios,
//           cant_habit: c.cant_habit,
//           cant_telef: c.cant_telef,
//           clasificacion_unidad_id: c.clasificacion_unidad_id,
//           condicion_ocupacion_id: c.condicion_ocupacion_id,
//           construccion_id: c.construccion_id,
//           estado: c.estado,
//           estructura_columna_id: c.estructura_columna_id,
//           estructura_cubierta_id: c.estructura_cubierta_id,
//           estructura_entrepiso_id: c.estructura_entrepiso_id,
//           estructura_escaleras_id: c.estructura_escaleras_id,
//           estructura_paredes_id: c.estructura_paredes_id,
//           estructura_vigascadenas_id: c.estructura_vigascadenas_id,
//           id: c.id,
//           instalacion_banos_id: c.instalacion_banos_id,
//           instalacion_conservacion_id: c.instalacion_conservacion_id,
//           instalacion_electricas_id: c.instalacion_electricas_id,
//           instalacion_especiales_id: c.instalacion_especiales_id,
//           instalacion_etapa_id: c.instalacion_etapa_id,
//           instalacion_indust_id: c.instalacion_indust_id,
//           instalacion_sanitarias_id: c.instalacion_sanitarias_id,
//           num_habitantes: c.num_habitantes,
//           prediourb_id: c.prediourb_id,
//           tipo_ocupantes_id: c.tipo_ocupantes_id,
//           tipo_usos2_id: c.tipo_usos2_id,
//           tipo_usos_id: c.tipo_usos_id,
//           tipo_vivienda_id: c.tipo_vivienda_id,
//           valor_cultural_id: c.valor_cultural_id,

//           // Auditoria de Sincronizacion
//           fecha_modificacion: c.fecha_modificacion,
//           estado_sincronizado: c.estado_sincronizado,
//           estado_modificado: c.estado_modificado,
//           updated_users: c.updated_users,
//           fecha_hora: c.fecha_hora,
//         };

//         if (data !== null) {
//           const idx = data.findIndex(
//             (item) =>
//               item.prediourb_id === objData.prediourb_id &&
//               item.construccion_id === objData.construccion_id
//           );
//           if (idx < 0) {
//             // No se encuentra coindicencia, entonces se agrega.
//             //  data.push(objData); HACER NADA, CONSTRUCCION NO SE AGREGA
//           } else {
//             // Caso contrario modifico el registro.
//             data[idx] = objData;
//           }
//           // Save the entire data again
//           this.storage.set(tabla.detalles, data);
//           this.marcarModificado();
//           this.ui.presentToast('Informacion Construccion Grabado');
//         } else {
//           const dataInit: DatosAdicionales[] = [];
//           dataInit.push(objData);
//           this.storage.set(tabla.detalles, dataInit);
//         }
//       });

//       // this.catastroUrbanoForm.datos_adicionales.fecha_modificacion = new Date();
//       // this.catastroUrbanoForm.datos_adicionales.estado_modificado = true;
//     });
//   }

//   grabarFotoPredio() {
//     this.storage.get(tabla.foto_predio).then((data) => {
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.fotografia.clave = this.id;
//       this.catastroUrbanoForm.fotografia.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.fotografia.estado_modificado = true;
//       //  // //console.log(this.catastroUrbanoForm.fotografia);
//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.fotografia.clave
//         );
//         // // //console.log(idx);
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.fotografia);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.fotografia;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.foto_predio, data);
//         this.marcarModificado();
//         this.ui.presentToast('Fotografia Grabada');
//       } else {
//         const dataInit: Fotografia[] = [];
//         dataInit.push(this.catastroUrbanoForm.fotografia);
//         this.storage.set(tabla.foto_predio, dataInit);
//       }
//     });
//   }

//   grabarFotoCroquis() {
//     this.storage.get(tabla.foto_predio).then((data) => {
//       // Setear Campos de auditoria
//       this.catastroUrbanoForm.fotografia.clave = this.id;
//       this.catastroUrbanoForm.fotografia.fecha_modificacion = new Date();
//       this.catastroUrbanoForm.fotografia.estado_modificado = true;
//       // // //console.log(this.catastroUrbanoForm.fotografia);

//       if (data !== null) {
//         const idx = data.findIndex(
//           (c) => c.clave === this.catastroUrbanoForm.fotografia.clave
//         );
//         // // //console.log(idx);
//         if (idx < 0) {
//           // No se encuentra coindicencia, entonces se agrega.
//           data.push(this.catastroUrbanoForm.fotografia);
//         } else {
//           // Caso contrario modifico el registro.
//           data[idx] = this.catastroUrbanoForm.fotografia;
//         }
//         // Save the entire data again
//         this.storage.set(tabla.foto_predio, data);
//         this.marcarModificado();
//         this.ui.presentToast('Croquis Grabada');
//       } else {
//         const dataInit: Fotografia[] = [];
//         dataInit.push(this.catastroUrbanoForm.fotografia);

//         this.storage.set(tabla.foto_predio, dataInit);
//       }
//     });
//   }

  // Cards Expandables
  expandItem(item: number): void {
    this.listaTarjetas[item].expanded = !this.listaTarjetas[item].expanded;      console.log('item', item);
    console.log('item', item);
    switch (item) {
      case 0:
        // Tarjeta Informacion Basica
        if (!this.listaTarjetas[item].wasExpanded) {
          // Inicializar Datos de la Tarjeta
          this.presentarInformacionBasica();
          this.listaTarjetas[item].wasExpanded = true;
        }
        break;
        case 1:
          // Tarjeta Propietario
          if (!this.listaTarjetas[item].wasExpanded) {
            // Inicializar Datos de la Tarjeta
            this.presentarInformacionPropietario();
            this.listaTarjetas[item].wasExpanded = true;
          }
          break;
          case 2:
          // Tarjeta Hipoteca (Ocupante del Predio)
          if (!this.listaTarjetas[item].wasExpanded) {
            // Inicializar Datos de la Tarjeta
            this.presentarInformacionOcupante();
            this.listaTarjetas[item].wasExpanded = true;
          }
          break;
          case 3:
          // Tarjeta Datos Predio
          if (!this.listaTarjetas[item].wasExpanded) {
            // Inicializar Datos de la Tarjeta
            this.presentarDatosPredio();
            this.listaTarjetas[item].wasExpanded = true;
          }
          break;
          case 4:
          // Tarjeta Caracteristicas (Copropietarios, Uso del Predio)
          if (!this.listaTarjetas[item].wasExpanded) {
            // Inicializar Datos de la Tarjeta
            this.presentarUsoPredio();
            this.presentarCopropietario();
            this.listaTarjetas[item].wasExpanded = true;
          }
          break;
          case 5:
           // Tarjeta Contruccion ((Detalle (Datos Adicionales), Tipo Mejoras)
          if (!this.listaTarjetas[item].wasExpanded) {
            // Inicializar Datos de la Tarjeta
            this.presentarDatosAdicionales();
            this.presentarTipoMejora();
            this.listaTarjetas[item].wasExpanded = true;
          }
          break;
          case 6:
           // Tarjeta Fotos
            if (!this.listaTarjetas[item].wasExpanded) {
              // Inicializar Datos de la Tarjeta
              this.presentarFotografia();
              this.listaTarjetas[item].wasExpanded = true;
            }
            break;
      default:
        break;
    }
  }

  // Selectable
  portChange(event: { component: IonicSelectableComponent; value: any }) {
  }

  cambiar($event) {
    console.log('evento cambiar', $event);
  }

//   //#region Accion Botones

  // Click Boton regresar
  public regresar() {
    this.modalCtrl.dismiss();
  }
  //#endregion

//   //#region Busqueda Combos Grandes

  buscarCallePrincipal($event: any) {
    const texto: string = $event.text;
    this.combos.cmbCallePrincipal.cmb = this.combos.cmbCallePrincipal.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarInterseccionUno($event: any) {
    const texto: string = $event.text;
    this.combos.cmbInteseccionUno.cmb = this.combos.cmbInteseccionUno.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarInterseccionDos($event: any) {
    const texto: string = $event.text;
    this.combos.cmbInteseccionDos.cmb = this.combos.cmbInteseccionDos.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarBarrios($event: any) {
    const texto: string = $event.text;
    this.combos.cmbBarrios.cmb = this.combos.cmbBarrios.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarCondominios($event: any) {
    const texto: string = $event.text;
    this.combos.cmbCondominios.cmb = this.combos.cmbCondominios.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarPropietario($event: any) {
//     const resultadoCedula = contribuyentes.contribuyentes.filter(data => data.identificacion.includes(texto.toUpperCase())
//     || data.nombres.includes(texto.toUpperCase())).slice(0, 5);
// if (resultadoCedula.length > 0) {
// resultadoCedula.forEach( c => {
// this.busqueda.push(c);
// });
// }
// });

    const texto: string = $event.text;
    this.combos.cmbPropietario.cmb = this.combos.cmbPropietario.listado
      .filter((data) => data.identificacion.includes(texto.toUpperCase()) || data.nombres.includes(texto.toUpperCase()))
      .slice(0, 10);

      this.combos.cmbPropietario.cmb.forEach(c => { c.identificacion = c.identificacion + ' - ' + c.nombres; });
  }

  buscarPropietarioAnt($event: any) {
    const texto: string = $event.text;
    this.combos.cmbPropietarioAnt.cmb = this.combos.cmbPropietario.listado
      .filter(data => data.identificacion.includes(texto.toUpperCase()) || data.nombres.includes(texto.toUpperCase()))
      .slice(0, 10);
      this.combos.cmbPropietarioAnt.cmb.forEach(c => { c.identificacion = c.identificacion + ' - ' + c.nombres; });
  }

  buscarAdquisiciones($event: any) {
    const texto: string = $event.text;
    this.combos.cmbAdquisiciones.cmb = this.combos.cmbAdquisiciones.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarCantones($event: any) {
    const texto: string = $event.text;
    this.combos.cmbCantones.cmb = this.combos.cmbCantones.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarUsoSuelo($event: any) {
    const texto: string = $event.text;
    this.combos.cmbUsoSuelo.cmb = this.combos.cmbUsoSuelo.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarTipoUsos($event: any) {
    const texto: string = $event.text;
    this.combos.cmbTipoUsos.cmb = this.combos.cmbTipoUsos.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  buscarTipoUsosDos($event: any) {
    const texto: string = $event.text;
    this.combos.cmbTipoUsosDos.cmb = this.combos.cmbTipoUsosDos.listado
      .filter((data) => data._name.includes(texto.toUpperCase()))
      .slice(0, 10);
  }

  //#endregion

  //#region Carga de Datos

  //#region Seccion Combos (Tarjeta Informacion Basica)

  //#endregion
  private cargarTipoPredio() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoPredio).tablaBase;
   
    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      console.log(tabla);
      this.combos.cmbTipoPredio.listado = tabla.data;
      this.combos.cmbTipoPredio.selected = this.combos.cmbTipoPredio.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.informacion_basica.tipo_predio_id
      );
      this.combos.cmbTipoPredio.cmb = this.combos.cmbTipoPredio.listado;
    });
  }

  private cargarCalles() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Calle).tablaBase;
   
    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      if (!tabla) {
       this.ui.alertaInformativa("No hay informacion de Calles");
       return;
      }
     
      // Cargar Selector
      this.combos.cmbCallePrincipal.listado = tabla.data;
      this.combos.cmbCallePrincipal.selected = this.combos.cmbCallePrincipal.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.informacion_basica.calle_principal_id
      );

      this.combos.cmbInteseccionUno.listado = tabla.data;
      this.combos.cmbInteseccionUno.selected = this.combos.cmbCallePrincipal.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.informacion_basica.interseccion1_id
      );

      this.combos.cmbInteseccionDos.listado = tabla.data;
      this.combos.cmbInteseccionDos.selected = this.combos.cmbCallePrincipal.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.informacion_basica.interseccion2_id
      );
      // Cargar Combo
      this.combos.cmbCallePrincipal.cmb.push(
        this.combos.cmbCallePrincipal.selected
      );
      this.combos.cmbInteseccionUno.cmb.push(
        this.combos.cmbInteseccionUno.selected
      );
      this.combos.cmbInteseccionDos.cmb.push(
        this.combos.cmbInteseccionDos.selected
      );

      this.combos.cmbCallePrincipal.cmb = this.combos.cmbCallePrincipal.listado;
      this.combos.cmbInteseccionUno.cmb = this.combos.cmbCallePrincipal.listado;
      this.combos.cmbInteseccionDos.cmb = this.combos.cmbCallePrincipal.listado;
    });
  }

  private cargarZonificaciones() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Zonificacion).tablaBase;
   
    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      if (!tabla) {
        return;
      }
      this.combos.cmbZonificaciones.listado = tabla.data;
      this.combos.cmbZonificaciones.selected = this.combos.cmbZonificaciones.listado.find(
        (c) =>
          c.id ===
          this.catastroUrbanoForm.informacion_basica.zonificacion_predio_id
      );
      this.combos.cmbZonificaciones.cmb = this.combos.cmbZonificaciones.listado;
    });
  }

  private cargarBarrios() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Barrio).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbBarrios.listado = tabla.data;
      // Cargar Selector
      this.combos.cmbBarrios.selected = this.combos.cmbBarrios.listado.find(
        (c) =>
          c.id ===
          this.catastroUrbanoForm.informacion_basica.ciudadela_predio_id
      );
      // Cargar Combo
      this.combos.cmbBarrios.cmb.push(this.combos.cmbBarrios.selected);
      this.combos.cmbBarrios.cmb = this.combos.cmbBarrios.listado;
    });
  }

  private cargarCondominios() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Condominio).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCondominios.listado = tabla.data;
      // Cargar Selector
      this.combos.cmbCondominios.selected = this.combos.cmbCondominios.listado.find(
        (c) =>
          c.id ===
          this.catastroUrbanoForm.informacion_basica.condominio_predio_id
      );
      // Cargar Combo
      this.combos.cmbCondominios.cmb.push(this.combos.cmbCondominios.selected);
      this.combos.cmbCondominios.cmb = this.combos.cmbCondominios.listado;
    });
  }

  private cargarTipoCalles() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoCalle).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoCalles.listado = tabla.data;
      this.combos.cmbTipoCalles.selected = this.combos.cmbTipoCalles.listado.find(
        (c) => c.id === this.catastroUrbanoForm.informacion_basica.tipo_via_id
      );
      this.combos.cmbTipoCalles.cmb = this.combos.cmbTipoCalles.listado;
    });
  }

  private cargarClasificacionSuelo() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.ClasificacionSuelo).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbClasificacionSuelo.listado = tabla.data;
      this.combos.cmbClasificacionSuelo.selected = this.combos.cmbClasificacionSuelo.listado.find(
        (c) =>
          c.id ===
          this.catastroUrbanoForm.informacion_basica.clasificacion_suelo_id
      );
      this.combos.cmbClasificacionSuelo.cmb = this.combos.cmbClasificacionSuelo.listado;
    });
  }

  private cargarSituacionPredio() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.SituacionPredio).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbSituacionPredio.listado = tabla.data;
      this.combos.cmbSituacionPredio.selected = this.combos.cmbSituacionPredio.listado.find(
        (c) => c.id === this.catastroUrbanoForm.propietario.situacion_predio_id
      );
      this.combos.cmbSituacionPredio.cmb = this.combos.cmbSituacionPredio.listado;
    });
  }

  private cargarDominios() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Dominio).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbDominios.listado = tabla.data;
      this.combos.cmbDominios.selected = this.combos.cmbDominios.listado.find(
        (c) => c.id === this.catastroUrbanoForm.propietario.dominio_predio_id
      );
      this.combos.cmbDominios.cmb = this.combos.cmbDominios.listado;
    });
  }

  private cargarAdquisiciones() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Adquisicion).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAdquisiciones.listado = tabla.data;
      // Cargar Selector
      this.combos.cmbAdquisiciones.selected = this.combos.cmbAdquisiciones.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.propietario.adquisicion_predio_id
      );
      // Cargar Combo
      this.combos.cmbAdquisiciones.cmb.push(
        this.combos.cmbAdquisiciones.selected
      );
      this.combos.cmbAdquisiciones.cmb = this.combos.cmbAdquisiciones.listado;
    });
  }

  private cargarCantones() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Canton).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCantones.listado = tabla.data;
      // Cargar Selector
      this.combos.cmbCantones.selected = this.combos.cmbCantones.listado.find(
        (c) => c.id === this.catastroUrbanoForm.propietario.canton_id
      );
      // Cargar Combo
      this.combos.cmbCantones.cmb.push(this.combos.cmbCantones.selected);
      this.combos.cmbCantones.cmb = this.combos.cmbCantones.listado;
    });
  }

  private cargarFormas() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Forma).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbFormas.listado = tabla.data;
      this.combos.cmbFormas.selected = this.combos.cmbFormas.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.forma_predio_id
      );
      this.combos.cmbFormas.cmb = this.combos.cmbFormas.listado;
    });
  }

  private cargarTopografias() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Topografia).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTopografias.listado = tabla.data;
      this.combos.cmbTopografias.selected = this.combos.cmbTopografias.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.topografia_predio_id
      );
      this.combos.cmbTopografias.cmb = this.combos.cmbTopografias.listado;
    });
  }

  private cargarAfectacionTerremoto() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.AfectacionTerremoto).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAfectacionTerremoto.listado = tabla.data;
      this.combos.cmbAfectacionTerremoto.selected = this.combos.cmbAfectacionTerremoto.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.afectacion_terremoto_id
      );
      this.combos.cmbAfectacionTerremoto.cmb = this.combos.cmbAfectacionTerremoto.listado;
    });
  }

  private cargarLocalizacion() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Localizacion).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbLocalizacion.listado = tabla.data;
      this.combos.cmbLocalizacion.selected = this.combos.cmbLocalizacion.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.localizacion_predio_id
      );
      this.combos.cmbLocalizacion.cmb = this.combos.cmbLocalizacion.listado;
    });
  }

  private cargarAfectacion() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Afectacion).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAfectacion.listado = tabla.data;
      this.combos.cmbAfectacion.selected = this.combos.cmbAfectacion.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.afectacion_predio_id
      );
      this.combos.cmbAfectacion.cmb = this.combos.cmbAfectacion.listado;
    });
  }

  private cargarAbastecimientoAgua() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.AbastecimientoAgua).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAbastecimientoAgua.listado = tabla.data;
      this.combos.cmbAbastecimientoAgua.selected = this.combos.cmbAbastecimientoAgua.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.abastecimiento_agua_id
      );
      this.combos.cmbAbastecimientoAgua.cmb = this.combos.cmbAbastecimientoAgua.listado;
    });
  }

  private cargarElectricidad() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Electricidad).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbElectricidad.listado = tabla.data;
      this.combos.cmbElectricidad.selected = this.combos.cmbElectricidad.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.energia_electrica_id
      );
      this.combos.cmbElectricidad.cmb = this.combos.cmbElectricidad.listado;
    });
  }

  private cargarTransporte() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Transporte).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTransporte.listado = tabla.data;
      this.combos.cmbTransporte.selected = this.combos.cmbTransporte.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.transporte_urbano_id
      );
      this.combos.cmbTransporte.cmb = this.combos.cmbTransporte.listado;
    });
  }

  private cargarInternet() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Internet).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbInternet.listado = tabla.data;
      this.combos.cmbInternet.selected = this.combos.cmbInternet.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.internet_predio_id
      );
      this.combos.cmbInternet.cmb = this.combos.cmbInternet.listado;
    });
  }

  private cargarTipoSuelo() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoSuelo).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoSuelo.listado = tabla.data;
      this.combos.cmbTipoSuelo.selected = this.combos.cmbTipoSuelo.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.tipo_suelo_id
      );
      this.combos.cmbTipoSuelo.cmb = this.combos.cmbTipoSuelo.listado;
    });
  }

  private cargarAlumbrados() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Alumbrado).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAlumbrados.listado = tabla.data;
      this.combos.cmbAlumbrados.selected = this.combos.cmbAlumbrados.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.alumbrado_predio_id
      );
      this.combos.cmbAlumbrados.cmb = this.combos.cmbAlumbrados.listado;
    });
  }

  private cargarRecoleccionBasura() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.RecoleccionBasura).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbRecoleccionBasura.listado = tabla.data;
      this.combos.cmbRecoleccionBasura.selected = this.combos.cmbRecoleccionBasura.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.recoleccion_basura_id
      );
      this.combos.cmbRecoleccionBasura.cmb = this.combos.cmbRecoleccionBasura.listado;
    });
  }

  private cargarEstado() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Estado).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEstado.listado = tabla.data;
      this.combos.cmbEstado.selected = this.combos.cmbEstado.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.estado_predio_id
      );
      this.combos.cmbEstado.cmb = this.combos.cmbEstado.listado;
    });
  }

  private cargarAlcantarillado() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Alcantarillado).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAlcantarillado.listado = tabla.data;
      this.combos.cmbAlcantarillado.selected = this.combos.cmbAlcantarillado.listado.find(
        (c) =>
          c.id === this.catastroUrbanoForm.datos_predio.alcantarillado_predio_id
      );
      this.combos.cmbAlcantarillado.cmb = this.combos.cmbAlcantarillado.listado;
    });
  }

  private cargarTelefonia() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Telefonia).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTelefonia.listado = tabla.data;
      this.combos.cmbTelefonia.selected = this.combos.cmbTelefonia.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.telefonia_predio_id
      );
      this.combos.cmbTelefonia.cmb = this.combos.cmbTelefonia.listado;
    });
  }

  private cargarAseoCalles() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.AseoCalle).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbAseoCalles.listado = tabla.data;
      this.combos.cmbAseoCalles.selected = this.combos.cmbAseoCalles.listado.find(
        (c) => c.id === this.catastroUrbanoForm.datos_predio.aseo_predio_id
      );
      this.combos.cmbAseoCalles.cmb = this.combos.cmbAseoCalles.listado;
    });
  }

  private cargarUsoSuelo() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.UsoSuelo).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbUsoSuelo.listado = tabla.data;
      // Cargar Selector
      this.catastroUrbanoForm.uso_predio.forEach((c) => {
        const combo = (this.combos.cmbUsoSuelo.selected = this.combos.cmbUsoSuelo.listado.find(
          (cmb) => cmb.id === c.tipo_usos_id
        ));
        // Cargar Combo
        // debugger;
        c.cmb_tipo_usos_id = new ComboBox();
        c.cmb_tipo_usos_id.selected = combo;
        this.combos.cmbUsoSuelo.cmb.push(this.combos.cmbUsoSuelo.selected);
        this.combos.cmbUsoSuelo.cmb = this.combos.cmbUsoSuelo.listado;
      });
    });
  }

  // this.combos.cmbColumnas.selected = this.combos.cmbColumnas.listado.filter(c => c.id ===
  //   this.catastroUrbanoForm.datos_adicionales.estructura_columna_id);
  private cargarColumnas() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Columna).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      //console.log('listado de columnas', data);
      this.combos.cmbColumnas.listado = tabla.data;

      if (this.combos.cmbColumnas.listado === null) {
        this.ui.presentToast('No se encontró Columnas, considere sincronizar!.');
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_columna_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbColumnas.listado.find(
            (cmb) => cmb.id === c.estructura_columna_id
          );

          c.cmb_estructura_columna_id = new ComboBox();
          c.cmb_estructura_columna_id.selected = combo;
          // //console.log('las putas columnas',  c.cmb_estructura_columna_id, combo);
        });
        this.combos.cmbColumnas.cmb = this.combos.cmbColumnas.listado;
      }
    });
    // //console.log('columnas_VMB', this.catastroUrbanoForm.datos_adicionales);
  }

  private cargarEntrepisos() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Entrepiso).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEntrepisos.listado = tabla.data;
      if (this.combos.cmbEntrepisos.listado === null) {
        this.ui.toastTabla(tabla.entrepisos);
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_entrepiso_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbEntrepisos.listado.find(
            (cmb) => cmb.id === c.estructura_entrepiso_id
          );
          c.cmb_estructura_entrepiso_id = new ComboBox();
          c.cmb_estructura_entrepiso_id.selected = combo;
        });
        this.combos.cmbEntrepisos.cmb = this.combos.cmbEntrepisos.listado;
      }
    });
  }

  private cargarCubiertas() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Cubierta).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCubiertas.listado = tabla.data;
      if (this.combos.cmbCubiertas.listado === null) {
        this.ui.presentToast(
          "No se encontró Cubiertas, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_cubierta_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbCubiertas.listado.find(
            (cmb) => cmb.id === c.estructura_cubierta_id
          );
          c.cmb_estructura_cubierta_id = new ComboBox();
          c.cmb_estructura_cubierta_id.selected = combo;
        });
        this.combos.cmbCubiertas.cmb = this.combos.cmbCubiertas.listado;
      }
    });
  }

  private cargarVigasCadenas() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.VigaCadena).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbVigasCadenas.listado = tabla.data;
      if (this.combos.cmbVigasCadenas.listado === null) {
        this.ui.presentToast(
          "No se encontró Vigas Cadenas, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_vigascadenas_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbVigasCadenas.listado.find(
            (cmb) => cmb.id === c.estructura_vigascadenas_id
          );
          c.cmb_estructura_vigascadenas_id = new ComboBox();
          c.cmb_estructura_vigascadenas_id.selected = combo;
        });
        this.combos.cmbVigasCadenas.cmb = this.combos.cmbVigasCadenas.listado;
      }
    });
  }

  private cargarParedes() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Pared).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbParedes.listado = tabla.data;
      if (this.combos.cmbParedes.listado === null) {
        this.ui.presentToast("No se encontró Paredes, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_paredes_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbParedes.listado.find(
            (cmb) => cmb.id === c.estructura_paredes_id
          );
          c.cmb_estructura_paredes_id = new ComboBox();
          c.cmb_estructura_paredes_id.selected = combo;
        });
        this.combos.cmbParedes.cmb = this.combos.cmbParedes.listado;
      }
    });
  }

  private cargarEscaleras() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Escalera).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEscaleras.listado = tabla.data;
      if (this.combos.cmbEscaleras.listado === null) {
        this.ui.presentToast(
          "No se encontró Escaleras, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_estructura_escaleras_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbEscaleras.listado.find(
            (cmb) => cmb.id === c.estructura_escaleras_id
          );
          c.cmb_estructura_escaleras_id = new ComboBox();
          c.cmb_estructura_escaleras_id.selected = combo;
        });
        this.combos.cmbEscaleras.cmb = this.combos.cmbEscaleras.listado;
      }
    });
  }

  private cargarEscalerasAcabado() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.EscalerasAcabado).tablaBase;

    // TODO: Paola Rodriguez aplicar esta validacion a todos los cargar de los combos.
    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEscalerasAcabado.listado = tabla.data;
      if (this.combos.cmbEscalerasAcabado.listado === null) {
        this.ui.presentToast(
          "No se encontró Acabado Escaleras, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          // const combo = this.combos.cmbEscalerasAcabado.listado.find(cmb => cmb.id === c.acabado_escalera_id);
          c.cmb_acabado_escalera_id = new ComboBox();
          //  c.cmb_acabado_escalera_id.selected = combo;
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbEscalerasAcabado.listado.find(
            (cmb) => cmb.id === c.acabado_escalera_id
          );
          c.cmb_acabado_escalera_id = new ComboBox();
          c.cmb_acabado_escalera_id.selected = combo;
        });
        this.combos.cmbEscalerasAcabado.cmb = this.combos.cmbEscalerasAcabado.listado;
      }
    });
  }

  private cargarPisos() {

    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Piso).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbPisos.listado = tabla.data;
      if (this.combos.cmbPisos.listado === null) {
        this.ui.presentToast("No se encontró Pisos, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_pisos_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbPisos.listado.find(
            (cmb) => cmb.id === c.acabado_pisos_id
          );
          c.cmb_acabado_pisos_id = new ComboBox();
          c.cmb_acabado_pisos_id.selected = combo;
        });
        this.combos.cmbPisos.cmb = this.combos.cmbPisos.listado;
      }
    });
  }

  private cargarRevestimientoExterior() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.RevestimientoExterior).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbRevestimientoExterior.listado = tabla.data;
      if (this.combos.cmbRevestimientoExterior.listado === null) {
        this.ui.presentToast(
          "No se encontró Revestimiento Exterior, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_revesexte_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbRevestimientoExterior.listado.find(
            (cmb) => cmb.id === c.acabado_revesexte_id
          );
          c.cmb_acabado_revesexte_id = new ComboBox();
          c.cmb_acabado_revesexte_id.selected = combo;
        });
        this.combos.cmbRevestimientoExterior.cmb = this.combos.cmbRevestimientoExterior.listado;
      }
    });
  }

  private cargarPuertas() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Puerta).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbPuertas.listado = tabla.data;
      if (this.combos.cmbPuertas.listado === null) {
        this.ui.presentToast("No se encontró Puertas, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_puertas_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbPuertas.listado.find(
            (cmb) => cmb.id === c.acabado_puertas_id
          );
          c.cmb_acabado_puertas_id = new ComboBox();
          c.cmb_acabado_puertas_id.selected = combo;
        });
        this.combos.cmbPuertas.cmb = this.combos.cmbPuertas.listado;
      }
    });
  }

  private cargarCubiertasAcabados() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.CubiertaAcabado).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCubiertasAcabados.listado = tabla.data;
      if (this.combos.cmbCubiertasAcabados.listado === null) {
        this.ui.presentToast(
          "No se encontró Cubierta Acabados, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_cubierta_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbCubiertasAcabados.listado.find(
            (cmb) => cmb.id === c.acabado_cubierta_id
          );
          c.cmb_acabado_cubierta_id = new ComboBox();
          c.cmb_acabado_cubierta_id.selected = combo;
        });
        this.combos.cmbCubiertasAcabados.cmb = this.combos.cmbCubiertasAcabados.listado;
      }
    });
  }

  private cargarVentanas() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Ventana).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbVentanas.listado = tabla.data;
      if (this.combos.cmbVentanas.listado === null) {
        this.ui.presentToast("No se encontró Ventanas, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_ventanas_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbVentanas.listado.find(
            (cmb) => cmb.id === c.acabado_ventanas_id
          );
          c.cmb_acabado_ventanas_id = new ComboBox();
          c.cmb_acabado_ventanas_id.selected = combo;
        });
        this.combos.cmbVentanas.cmb = this.combos.cmbVentanas.listado;
      }
    });
  }

  private cargarRevestimientoInterior() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.RevestimientoInterior).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbRevestimientoInterior.listado = tabla.data;
      if (this.combos.cmbRevestimientoInterior.listado === null) {
        this.ui.presentToast(
          "No se encontró Revestimiento Interior, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_revesinte_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbRevestimientoInterior.listado.find(
            (cmb) => cmb.id === c.acabado_revesinte_id
          );
          c.cmb_acabado_revesinte_id = new ComboBox();
          c.cmb_acabado_revesinte_id.selected = combo;
        });
        this.combos.cmbRevestimientoInterior.cmb = this.combos.cmbRevestimientoInterior.listado;
      }
    });
  }

  private cargarTumbados() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Tumbado).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTumbado.listado = tabla.data;
      if (this.combos.cmbTumbado.listado === null) {
        this.ui.presentToast("No se encontró Tumbados, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_tumbados_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbTumbado.listado.find(
            (cmb) => cmb.id === c.acabado_tumbados_id
          );
          c.cmb_acabado_tumbados_id = new ComboBox();
          c.cmb_acabado_tumbados_id.selected = combo;
        });
        this.combos.cmbTumbado.cmb = this.combos.cmbTumbado.listado;
      }
    });
  }

  private cargarCloset() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Closet).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCloset.listado = tabla.data;
      if (this.combos.cmbCloset.listado === null) {
        this.ui.presentToast("No se encontró Closet, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_closet_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbCloset.listado.find(
            (cmb) => cmb.id === c.acabado_closet_id
          );
          c.cmb_acabado_closet_id = new ComboBox();
          c.cmb_acabado_closet_id.selected = combo;
        });
        this.combos.cmbCloset.cmb = this.combos.cmbCloset.listado;
      }
    });
  }

  private cargarCubreVentana() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.CubreVentana).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCubreVentana.listado = tabla.data;
      if (this.combos.cmbCubreVentana.listado === null) {
        this.ui.presentToast(
          "No se encontró Cubre Ventana, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_acabado_cubventana_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbCubreVentana.listado.find(
            (cmb) => cmb.id === c.acabado_cubventana_id
          );
          c.cmb_acabado_cubventana_id = new ComboBox();
          c.cmb_acabado_cubventana_id.selected = combo;
        });
        this.combos.cmbCubreVentana.cmb = this.combos.cmbCubreVentana.listado;
      }
    });
  }

  private cargarSanitarias() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Sanitaria).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbSanitarias.listado = tabla.data;
      if (this.combos.cmbSanitarias.listado === null) {
        this.ui.presentToast(
          "No se encontró Sanitarias, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_sanitarias_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbSanitarias.listado.find(
            (cmb) => cmb.id === c.instalacion_sanitarias_id
          );
          c.cmb_instalacion_sanitarias_id = new ComboBox();
          c.cmb_instalacion_sanitarias_id.selected = combo;
        });
        this.combos.cmbSanitarias.cmb = this.combos.cmbSanitarias.listado;
      }
    });
  }

  private cargarElectricas() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Electrica).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbElectricas.listado = tabla.data;
      if (this.combos.cmbElectricas.listado === null) {
        this.ui.presentToast(
          "No se encontró Electricas, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_electricas_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbElectricas.listado.find(
            (cmb) => cmb.id === c.instalacion_electricas_id
          );
          c.cmb_instalacion_electricas_id = new ComboBox();
          c.cmb_instalacion_electricas_id.selected = combo;
        });
        this.combos.cmbElectricas.cmb = this.combos.cmbElectricas.listado;
      }
    });
  }

  private cargarIndustriales() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Industrial).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbIndustriales.listado = tabla.data;
      if (this.combos.cmbIndustriales.listado === null) {
        this.ui.presentToast(
          "No se encontró Industriales, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_indust_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbIndustriales.listado.find(
            (cmb) => cmb.id === c.instalacion_indust_id
          );
          c.cmb_instalacion_indust_id = new ComboBox();
          c.cmb_instalacion_indust_id.selected = combo;
        });
        this.combos.cmbIndustriales.cmb = this.combos.cmbIndustriales.listado;
      }
    });
  }

  private cargarEtapas() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Etapa).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEtapas.listado = tabla.data;
      if (this.combos.cmbEtapas.listado === null) {
        this.ui.presentToast("No se encontró Etapas, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_etapa_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbEtapas.listado.find(
            (cmb) => cmb.id === c.instalacion_etapa_id
          );
          c.cmb_instalacion_etapa_id = new ComboBox();
          c.cmb_instalacion_etapa_id.selected = combo;
        });
        this.combos.cmbEtapas.cmb = this.combos.cmbEtapas.listado;
      }
    });
  }

  private cargarBanios() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Bano).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbBanios.listado = tabla.data;
      if (this.combos.cmbBanios.listado === null) {
        this.ui.presentToast("No se encontró Banios, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_banos_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbBanios.listado.find(
            (cmb) => cmb.id === c.instalacion_banos_id
          );
          c.cmb_instalacion_banos_id = new ComboBox();
          c.cmb_instalacion_banos_id.selected = combo;
        });
        this.combos.cmbBanios.cmb = this.combos.cmbBanios.listado;
      }
    });
  }

  private cargarEspeciales() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Especial).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbEspeciales.listado = tabla.data;
      if (this.combos.cmbEspeciales.listado === null) {
        this.ui.presentToast(
          "No se encontró Especiales, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_especiales_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbEspeciales.listado.find(
            (cmb) => cmb.id === c.instalacion_especiales_id
          );
          c.cmb_instalacion_especiales_id = new ComboBox();
          c.cmb_instalacion_especiales_id.selected = combo;
        });
        this.combos.cmbEspeciales.cmb = this.combos.cmbEspeciales.listado;
      }
    });
  }

  private cargarConservacion() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Conservacion).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbConservacion.listado = tabla.data;
      if (this.combos.cmbConservacion.listado === null) {
        this.ui.presentToast(
          "No se encontró Conservacion, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_instalacion_conservacion_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbConservacion.listado.find(
            (cmb) => cmb.id === c.instalacion_conservacion_id
          );
          c.cmb_instalacion_conservacion_id = new ComboBox();
          c.cmb_instalacion_conservacion_id.selected = combo;
        });
        this.combos.cmbConservacion.cmb = this.combos.cmbConservacion.listado;
      }
    });
  }

  private cargarClasificacionUnidad() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.ClasificacionUnidad).tablaBase;
    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbClasificacionUnidad.listado = tabla.data;
      if (this.combos.cmbClasificacionUnidad.listado === null) {
        this.ui.presentToast(
          "No se encontró Clasificacion Unidad, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_clasificacion_unidad_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbClasificacionUnidad.listado.find(
            (cmb) => cmb.id === c.clasificacion_unidad_id
          );
          c.cmb_clasificacion_unidad_id = new ComboBox();
          c.cmb_clasificacion_unidad_id.selected = combo;
        });
        this.combos.cmbClasificacionUnidad.cmb = this.combos.cmbClasificacionUnidad.listado;
      }
    });
  }

  private cargarCondicionOcupacion() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.CondicionOcupacion).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbCondicionOcupacion.listado = tabla.data;
      if (this.combos.cmbCondicionOcupacion.listado === null) {
        this.ui.presentToast(
          "No se encontró Condicion Ocupacion, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_condicion_ocupacion_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbCondicionOcupacion.listado.find(
            (cmb) => cmb.id === c.condicion_ocupacion_id
          );
          c.cmb_condicion_ocupacion_id = new ComboBox();
          c.cmb_condicion_ocupacion_id.selected = combo;
        });
        this.combos.cmbCondicionOcupacion.cmb = this.combos.cmbCondicionOcupacion.listado;
      }
    });
  }

  private cargarTipoOcupantes() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoOcupante).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoOcupantes.listado = tabla.data;
      if (this.combos.cmbTipoOcupantes.listado === null) {
        this.ui.presentToast(
          "No se encontró Tipo Ocupantes, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_tipo_ocupantes_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbTipoOcupantes.listado.find(
            (cmb) => cmb.id === c.tipo_ocupantes_id
          );
          c.cmb_tipo_ocupantes_id = new ComboBox();
          c.cmb_tipo_ocupantes_id.selected = combo;
        });
        this.combos.cmbTipoOcupantes.cmb = this.combos.cmbTipoOcupantes.listado;
      }
    });
  }

  private cargarTipoVivienda() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoVivienda).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoVivienda.listado = tabla.data;
      if (this.combos.cmbTipoVivienda.listado === null) {
        this.ui.presentToast(
          "No se encontró Tipo Vivienda, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_tipo_vivienda_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbTipoVivienda.listado.find(
            (cmb) => cmb.id === c.tipo_vivienda_id
          );
          c.cmb_tipo_vivienda_id = new ComboBox();
          c.cmb_tipo_vivienda_id.selected = combo;
        });
        this.combos.cmbTipoVivienda.cmb = this.combos.cmbTipoVivienda.listado;
      }
    });
  }

  private cargarValorCultural() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.ValorCultural).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbValorCultural.listado = tabla.data;
      if (this.combos.cmbValorCultural.listado === null) {
        this.ui.presentToast(
          "No se encontró Valor Cultural, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_valor_cultural_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbValorCultural.listado.find(
            (cmb) => cmb.id === c.valor_cultural_id
          );
          c.cmb_valor_cultural_id = new ComboBox();
          c.cmb_valor_cultural_id.selected = combo;
        });
        this.combos.cmbValorCultural.cmb = this.combos.cmbValorCultural.listado;
      }
    });
  }

  private cargarTipoUsos() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.UsoSuelo).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoUsos.listado = tabla.data;
      if (this.combos.cmbTipoUsos.listado === null) {
        this.ui.presentToast(
          "No se encontró Uso del Piso, considere sincronizar!."
        );
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_tipo_usos_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbTipoUsos.listado.find(
            (cmb) => cmb.id === c.tipo_usos_id
          );
          c.cmb_tipo_usos_id = new ComboBox();
          c.cmb_tipo_usos_id.selected = combo;
        });
        this.combos.cmbTipoUsos.cmb = this.combos.cmbTipoUsos.listado;
      }
    });
  }

  private cargarTipoUsosDos() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.UsoSuelo).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoUsosDos.listado = tabla.data;
      if (this.combos.cmbTipoUsosDos.listado === null) {
        this.ui.presentToast("No se encontró Otros, considere sincronizar!.");
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          c.cmb_tipo_usos_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
          const combo = this.combos.cmbTipoUsosDos.listado.find(
            (cmb) => cmb.id === c.tipo_usos2_id
          );
          c.cmb_tipo_usos2_id = new ComboBox();
          c.cmb_tipo_usos2_id.selected = combo;
        });
        this.combos.cmbTipoUsosDos.cmb = this.combos.cmbTipoUsosDos.listado;
      }
    });
  }

  private cargarMejora() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.TipoMejora).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
      this.combos.cmbTipoMejoras.listado = tabla.data;
      if (this.combos.cmbTipoMejoras.listado === null) {
        this.ui.presentToast(
        'No se encontró Tipo Mejora, considere sincronizar!.'
        );
        this.catastroUrbanoForm.tipo_mejora.forEach((c) => {
          c.cmb_tipo_mejoras_id = new ComboBox();
        });
      } else {
        this.catastroUrbanoForm.tipo_mejora.forEach((c) => {
          const combo = this.combos.cmbTipoMejoras.listado.find(
            (cmb) => cmb.id === c.tipo_mejoras_id
          );
          c.cmb_tipo_mejoras_id = new ComboBox();
          c.cmb_tipo_mejoras_id.selected = combo;
        });
        this.combos.cmbTipoMejoras.cmb = this.combos.cmbTipoMejoras.listado;
      }
    });
  }

  
  private cargarContribuyentes() {
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.ContribuyentePredio).tablaBase;

    this.db.buscarPrimerElemento(tabla).then((tabla) => {
        // // // //console.log('Contribuyente', data);
        this.combos.cmbPropietario.listado = tabla.data.contribuyentes;
        // Informacion Propietario
        const comboProp = this.combos.cmbPropietario.listado.find(
          (c) => c.id === this.catastroUrbanoForm.propietario.contribuyente_id
        );
        // //console.log(combo);
        if (comboProp === undefined) {
          this.combos.cmbPropietario.selected = new ComboBox();
        } else {
          this.combos.cmbPropietario.selected = comboProp;
        }

        // Cargar Combo
        this.combos.cmbPropietario.cmb.push(
          this.combos.cmbPropietario.selected
        );

       // Informacion Propietario Anterior
      const comboPropAnt = this.combos.cmbPropietario
                        .listado.find(c => c.id === this.catastroUrbanoForm.propietario.propietario_anterior_id);
    if (comboPropAnt === undefined) {
      this.combos.cmbPropietarioAnt.selected = new ComboBox();
    } else {
      this.combos.cmbPropietarioAnt.selected = comboPropAnt;
    }

    // Cargar Combo
    this.combos.cmbPropietarioAnt.cmb.push(this.combos.cmbPropietarioAnt.selected);

       // Actualizar el valor combo de copropietario
      this.catastroUrbanoForm.copropietario.forEach(c => {
        const combo = this.combos.cmbPropietario.listado.find( cmb => cmb.id === c.contribuyente_id);
       // console.log('cooombo', combo);
        c.cmb_contribuyente_id.selected = combo;
      });
    });
  }

  private cargarDatos() {
    
    const tabla: string = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.Barrio).tablaBase;

    // this.storage.get(tabla.tipo_predio).then((data: Combo[]) => {
    //   this.combos.cmbTipoPredio.listado = data;
    // });

    // this.storage.get(tabla.calles).then((data: Combo[]) => {
    //   this.combos.cmbCallePrincipal.listado = data;
    //   this.combos.cmbCallePrincipal.cmb = this.combos.cmbCallePrincipal.listado.slice(
    //     0,
    //     10
    //   );
    //   this.combos.cmbInteseccionUno.cmb = this.combos.cmbCallePrincipal.listado.slice(
    //     0,
    //     10
    //   );
    //   this.combos.cmbInteseccionDos.cmb = this.combos.cmbCallePrincipal.listado.slice(
    //     0,
    //     10
    //   );
    // });
  }
  //#endregion
}
