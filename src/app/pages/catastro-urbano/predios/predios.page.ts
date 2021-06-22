import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { ComboBox, CombosDatosPredio } from '../../../models/catastro-urbano/combo-datos-predio';
// import { Predios, ContribuyentePredio, CatastroUrbano, InformacionBasica, ContribuyenteSelect } from '../../../models/catastro-urbano/datos-predio';
// import { UiService } from '../../../services/ui-service.service';
// import { GestionCatastralComponent } from '../../../componentes/catastro-urbano/gestion-catastral/gestion-catastral.component';
// import {
//   InformacionGeneral,
//   tabla,
//   Usuarios
// } from '../../../models';
// import { Console } from 'console';
// import { AuthenticationService } from '../../../services/web/login.service';


@Component({
  selector: 'app-predios',
  templateUrl: './predios.page.html',
  styleUrls: ['./predios.page.scss'],
})
export class PrediosPage implements OnInit, AfterViewInit {

// public informacionGeneral: InformacionGeneral = new InformacionGeneral();
// public predio: Predios = new Predios();
// public claveValida = false;
// private currentUser: Usuarios;
// public contribuyenteResultado:  ContribuyenteSelect = new ContribuyenteSelect();
// public combos: CombosDatosPredio = new CombosDatosPredio();

  constructor(private storage: Storage,
              //private ui: UiService,
              private plt: Platform,
             // private authenticationService: AuthenticationService,
              private alertController: AlertController,
              private modalCtrl: ModalController, ) {
      // this.predio.cmbParroquias = new ComboBox();
      // this.predio.cmbPropietario = new ComboBox();
      // this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Esperar al inicio de los componentes nativos de la plataforma
    this.plt.ready().then(() => {
   //  this.cargarDatos();
    });
    }

//     cargarDatos() {
//       this.cargarInformacionGeneral();
//       this.cargarParroquias();
//       this.cargarContribuyentes();
//     }

//     cargarInformacionGeneral() {
//      this.storage.get(tabla.informacion_general).then((data: InformacionGeneral) => {
//       //  console.log('info-gene', data);
//         if (data === null) {
//           // No existe la tabla, instanciamos un objeto
//             // do nothing
//         } else {
//           // console.log('info-gene', data);
//           // Existe la tabla, ahora validar si hay registros en ella
//           // if (data.length > 0) {
//           //   // Si Hay Registros,
//           //   // Validamos que el objeto se encuentre en la base
//            this.predio.canton_codigo = data.canton_codigo;
//            this.predio.provincia_codigo = data.provincia_codigo;
//           // //  console.log('info-gene', this.informacionGeneral);
//           // }
//         }
//       });
//     }

//     cargarParroquias() {
//       this.storage.get(tabla.parroquias).then((data: any[]) => {
//         console.log('parroquias', data);
//          if (data === null) {
//            // No existe la tabla, instanciamos un objeto
//           //  data = [];
//          } else {
//            console.log('info-gene', data);
//            // Existe la tabla, ahora validar si hay registros en ella
//            if (data.length > 0) {
//              // Si Hay Registros,
//              // Validamos que el objeto se encuentre en la base
//             this.predio.cmbParroquias.listado = data;
//             this.predio.cmbParroquias.cmb = data.slice(0, 10);
//            //  console.log('info-gene', this.informacionGeneral);
//            }
//          }
//        });
//      }

//      private cargarContribuyentes() {
//       this.storage
//         .get(tabla.contribuyente_predio)
//         .then((data: ContribuyentePredio) => {
//           // // // //console.log('Contribuyente', data);
//           this.predio.cmbPropietario.listado = data.contribuyentes;
//           this.predio.cmbPropietario.listado.forEach(c => {
//             c.identificacion = c.identificacion + ' - ' + c.nombres;
//           });
//           // Informacion Propietario
//             this.predio.cmbPropietario.selected = new ComboBox();

//           // Cargar Combo
//           this.predio.cmbPropietario.cmb =  this.predio.cmbPropietario.listado.slice(0, 10);
//       });
//     }

//     buscarPropietario($event: any) {
//           const texto: string = $event.text;
//           this.predio.cmbPropietario.cmb = this.predio.cmbPropietario.listado
//                                                 // tslint:disable-next-line: max-line-length
//                                                 .filter((data) => data.identificacion.includes(texto.toUpperCase()) || data.nombres.includes(texto.toUpperCase()))
//                                                 .slice(0, 10);
//         }

//      // Selectable
//   portChange(event: { component: IonicSelectableComponent; value: any }) {
//     this.predio.parroquia_codigo = event.value.id;
//     this.actualizarClave();

//   }
//   grabarPredio() {
// console.log('selected', this.predio.cmbPropietario.selected);
//     const catastro: CatastroUrbano = new CatastroUrbano();
//     if (this.predio.cmbPropietario.selected.id !== undefined) {
//       console.log(this.predio.cmbPropietario.selected.id);
//       catastro.contribuyente_id = this.predio.cmbPropietario.selected.id;
//       catastro.clave = this.predio.clave;
//       catastro.fecha_modificacion = new Date();
//       catastro.estado_modificado = true;
//       catastro.updated_users = this.currentUser.name;

//       this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//         this.storage.get(tabla.informacion_basica).then((infoBasica: any[]) => {
//           contribuyentes.catastrourbano.push(catastro);
//           const info_basica = new InformacionBasica();
//           info_basica.clave = catastro.clave;
//           info_basica.fecha_modificacion = new Date();
//           info_basica.estado_modificado = true;
//           info_basica.updated_users = this.currentUser.name;
//           infoBasica.push(info_basica);
//           this.storage.set(tabla.informacion_basica, infoBasica);
//           this.storage.set(tabla.contribuyente_predio, contribuyentes);
//           this.ui.presentToast('Informacion Grabada con Exito');
//           this.presentarModal();
//         });
//       });
//     } else {
//       this.ui.presentToast('Debe seleccionar un propietario');
//       return;
//     }
//     console.log(catastro);
//   }

//   actualizarClave() {
//     this.predio.clave_parcial = this.predio.provincia_codigo
//                               + this.predio.canton_codigo
//                               + this.predio.parroquia_codigo
//                               + this.predio.zona_codigo
//                               + this.predio.sector_codigo
//                               + this.predio.manzana_codigo;


//     this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//         const resultadoClaves = contribuyentes.catastrourbano
//                                               .map(c => ({ clave: c.clave , contribuyente_id: c.contribuyente_id }))
//                                               .filter(data => data.clave.includes(this.predio.clave_parcial))
//                                               .sort(function (a, b) {
//                                                 if (a.clave > b.clave) {
//                                                   return 1;
//                                                 }
//                                                 if (a.clave < b.clave) {
//                                                   return -1;
//                                                 }
//                                                 // a must be equal to b
//                                                 return 0;
//                                               })
//                                              .slice(-1);

//        if (resultadoClaves.length > 0) {
//          console.log('resultadoClave', resultadoClaves);
//          this.predio.predio_codigo =   this.retornarCentena((parseInt(resultadoClaves[0].clave.substring(13, 16)) + 1).toString());
//        } else {
//         this.predio.predio_codigo = '001';
//        }
//        this.predio.clave = this.predio.provincia_codigo
//        + this.predio.canton_codigo
//        + this.predio.parroquia_codigo
//        + this.predio.zona_codigo
//        + this.predio.sector_codigo
//        + this.predio.manzana_codigo
//        + this.predio.predio_codigo
//        + this.predio.bloque_codigo
//        + this.predio.piso_codigo
//        + this.predio.departamento_codigo;

//        console.log(this.predio.clave, this.predio.provincia_codigo
//         + this.predio.canton_codigo
//         + this.predio.parroquia_codigo
//         + this.predio.zona_codigo
//         + this.predio.sector_codigo
//         + this.predio.manzana_codigo
//         + this.predio.predio_codigo
//         + this.predio.bloque_codigo
//         + this.predio.piso_codigo
//         + this.predio.departamento_codigo);
//    });

//   }
//   buscarClave() {
//     if (parseInt(this.predio.parroquia_codigo) === 0) {
//       this.ui.presentToast('Debe seleccionar una parroquia');
//       return;
//     }
//     if (parseInt(this.predio.manzana_codigo) === 0) {
//       this.ui.presentToast('Manzana no puede ser menor a 1');
//       return;
//     }
//     if (parseInt(this.predio.predio_codigo) === 0) {
//       this.ui.presentToast('Predio no puede ser menor a 1');
//       return;
//     }

//     this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//       const resultadoClaves = contribuyentes.catastrourbano
//                                             .map(c => ({ clave: c.clave , contribuyente_id: c.contribuyente_id }))
//                                             .filter(data => data.clave.includes(this.predio.clave));
//                                             console.log('resultadoClaves', resultadoClaves);
//       if (resultadoClaves.length > 0) {
//         this.ui.presentToast('Clave generada ya existe!');
//         return;
//       } else {
//         this.ui.presentToast('Accion Exitosa!');
//         this.claveValida = true;
//       }
//     });

//   }

//   buscarParroquias($event: any) {
//     const texto: string = $event.text;
//     this.predio.cmbParroquias.cmb = this.predio.cmbParroquias.listado
//       .filter((data) => data._name.includes(texto.toUpperCase()))
//       .slice(0, 10);
//   }
//   onlyNumbers(event: any) {
//     const pattern = /[0-9]/;
//     const inputChar = String.fromCharCode(event.charCode);
//     if (!pattern.test(inputChar)) {
//       // invalid character, prevent input
//       event.preventDefault();
//     }
//   }

//   retornarCentena(valor: string) {

//     if (parseInt(valor) <= 9 && parseInt(valor) !== 0) {
//       valor = '00' + parseInt(valor);
//     }
//     if (parseInt(valor) > 9 && parseInt(valor) <= 99 &&  parseInt(valor) !== 0) {
//       valor = '0' + parseInt(valor);
//     }
//     if (parseInt(valor) === 0 || valor === '') {
//       valor = '000';
//     }
//     return valor;
//   }
//   retornarDecena(valor: string) {

//     if (parseInt(valor) <= 9 && parseInt(valor) !== 0) {
//       valor = '0' + parseInt(valor);
//     }
//     if (parseInt(valor) === 0 || valor === '') {
//       valor = '00';
//     }
//     return valor;
//   }

//   async alertaInformativa( message: string ) {
//     const alert = await this.alertController.create({
//       message,
//       buttons: ['OK']
//     });

//     await alert.present();
//   }

  
//   async presentarModal() {
//     const alert = await this.alertController.create({
//       cssClass: 'my-custom-class',
//       // header: '¿Seguro?',
//       message: 'Predio creado con éxito',
//       buttons: [{
//         text: 'Salir',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: (blah) => {
//           this.ui.presentToast('Acción Cancelada');
//         }
//       }, {
//         text: 'Actualizar Ficha',
//         handler: () => {
//           this.abrirModal(this.predio.clave, false);
//         }
//       }]
//     });
//     await alert.present();
//   }

//   async abrirModal(id: string, editMode: boolean) {
//     const modal = await this.modalCtrl.create({
//       component: GestionCatastralComponent,
//       componentProps: {
//                         id: id,
//                         contribuyenteNombre : this.predio.cmbPropietario.selected.nombres,
//                         enabled: editMode
//                       }
//     });
//     modal.present();
//   }

//   limpiarPropietario() {
//     // //console.log('llego');
//     this.predio.cmbPropietario.selected = new ComboBox();
//   }


}
