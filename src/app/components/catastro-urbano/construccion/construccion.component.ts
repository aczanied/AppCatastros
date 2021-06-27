import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Combo, CombosDatosPredio, Predios, tabla } from 'src/app/models';
import { ContribuyentePredio, DatosAdicionales, ListaDatosAdicionales } from '../../../models/catastro-urbano/datos-predio';
import { ComboBox } from '../../../models/catastro-urbano/combo-datos-predio';
import { Storage } from '@ionic/storage';
import { UiService } from '../../../services/ui-service.service';
import { CatastroUrbanoForm } from '../../../models';
import { GestionCatastralComponent } from '../../../componentes/catastro-urbano/gestion-catastral/gestion-catastral.component';
import { Usuarios } from '../../../models/usuarios';
import { AuthenticationService } from '../../../services/web/login.service';



@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.component.html',
  styleUrls: ['./construccion.component.scss'],
})
export class ConstruccionComponent implements OnInit {
  // Entrada del Predio a Editar
  @Input() id;
  @Input() enabled;
  @Input() contribuyenteNombre;

  public combos: CombosDatosPredio = new CombosDatosPredio();
  public catastroUrbanoForm: CatastroUrbanoForm = new CatastroUrbanoForm();
  public construccion: DatosAdicionales = new DatosAdicionales();
  public cmbTipoUsos: ComboBox = new ComboBox();
  public cmbTipoUsosDos: ComboBox = new ComboBox();
  public predio: Predios = new Predios();
  private currentUser: Usuarios;
  constructor( private modalCtrl: ModalController,
    private storage: Storage,
    private ui: UiService,
    private alertController: AlertController,
    private authenticationService: AuthenticationService,
    ) {
      this.catastroUrbanoForm.datos_adicionales = [new ListaDatosAdicionales()];
     this.presentarDatosAdicionales();
    this.construccion.prediourb_id = this.id;
    this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    this.cargarTipoUsos();
    this.cargarTipoUsosDos();
  }
 // Click Boton regresar
 regresar() {
  this.modalCtrl.dismiss();
}

private cargarContribuyentes() {
  this.storage
    .get(tabla.contribuyente_predio)
    .then((data: ContribuyentePredio) => {
      // // // //console.log('Contribuyente', data);
      this.predio.cmbPropietario.listado = data.contribuyentes;
      // Informacion Propietario
        this.predio.cmbPropietario.selected = new ComboBox();

      // Cargar Combo
      this.predio.cmbPropietario.cmb =  this.predio.cmbPropietario.listado.slice(0, 10);
  });
}

retornarCentena(valor: string) {

  if (parseInt(valor) <= 9 && parseInt(valor) !== 0) {
    valor = '00' + parseInt(valor);
  }
  if (parseInt(valor) > 9 && parseInt(valor) <= 99 &&  parseInt(valor) !== 0) {
    valor = '0' + parseInt(valor);
  }
  if (parseInt(valor) === 0 || valor === '') {
    valor = '000';
  }
  return valor;
}
retornarDecena(valor: string) {

  if (parseInt(valor) <= 9 && parseInt(valor) !== 0) {
    valor = '0' + parseInt(valor);
  }
  if (parseInt(valor) === 0 || valor === '') {
    valor = '00';
  }
  return valor;
}

onlyNumbers(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

 // Selectable
 portChange(event: { component: IonicSelectableComponent; value: any }) {
}

buscarTipoUsos($event: any) {
  const texto: string = $event.text;
  console.log(' this.cmbTipoUsos.listado',  this.cmbTipoUsos.listado)
  this.cmbTipoUsos.cmb = this.cmbTipoUsos.listado
    .filter((data) => data._name.includes(texto.toUpperCase()))
    .slice(0, 10);
}

buscarTipoUsosDos($event: any) {
  const texto: string = $event.text;
  this.cmbTipoUsosDos.cmb = this.cmbTipoUsosDos.listado
    .filter((data) => data._name.includes(texto.toUpperCase()))
    .slice(0, 10);
}

private cargarTipoUsos() {
  this.storage.get(tabla.uso_suelo).then((data: ComboBox[]) => {
    this.cmbTipoUsos.listado = data;
    this.cmbTipoUsos.cmb = this.cmbTipoUsos.listado;
    const COMBO = this.cmbTipoUsos.listado.find(c => c.id === this.construccion.tipo_usos_id );
    if (COMBO === undefined) {
      this.cmbTipoUsos.selected = new Combo();
    } else {
      this.cmbTipoUsos.selected = COMBO;
    }
    if (this.cmbTipoUsos.listado === null) {
      this.ui.presentToast(
      'No se encontró Uso del Piso, considere sincronizar!.'
      );
      this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
        c.cmb_tipo_usos_id = new ComboBox();
      });
    } else {
      this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
        const combo = this.cmbTipoUsos.listado.find(
          (cmb) => cmb.id === c.tipo_usos_id
        );
        c.cmb_tipo_usos_id = new ComboBox();
        c.cmb_tipo_usos_id.selected = combo;
      });
     this.cmbTipoUsos.cmb = this.cmbTipoUsos.listado;
    }
  });
}

private cargarTipoUsosDos() {
  this.storage.get(tabla.uso_suelo).then((data: ComboBox[]) => {
    this.cmbTipoUsosDos.listado = data;
    this.cmbTipoUsosDos.cmb = this.cmbTipoUsosDos.listado;
    const COMBO = this.cmbTipoUsosDos.listado.find(c => c.id === this.construccion.tipo_usos2_id );
    if (COMBO === undefined) {
      this.cmbTipoUsosDos.selected = new Combo();
    } else {
      this.cmbTipoUsosDos.selected = COMBO;
    }
    if (this.cmbTipoUsosDos.listado === null) {
      this.ui.presentToast(
      'No se encontró Uso del Piso, considere sincronizar!.'
      );
      this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
        c.cmb_tipo_usos2_id = new ComboBox();
      });
    } else {
      this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
        const combo = this.cmbTipoUsosDos.listado.find(
          (cmb) => cmb.id === c.tipo_usos2_id
        );
        c.cmb_tipo_usos2_id = new ComboBox();
        c.cmb_tipo_usos2_id.selected = combo;
      });
     this.cmbTipoUsosDos.cmb = this.cmbTipoUsosDos.listado;
    }
  });
}

// private cargarTipoUsosDos() {
//   this.storage.get(tabla.uso_suelo).then((data: Combo[]) => {
//     this.combos.cmbTipoUsosDos.listado = data;
//     if (this.combos.cmbTipoUsosDos.listado === null) {
//       this.ui.presentToast('No se encontró Otros, considere sincronizar!.');
//       this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
//         c.cmb_tipo_usos_id = new ComboBox();
//       });
//     } else {
//       this.catastroUrbanoForm.datos_adicionales.forEach((c) => {
//         const combo = this.combos.cmbTipoUsosDos.listado.find(
//           (cmb) => cmb.id === c.tipo_usos2_id
//         );
//         c.cmb_tipo_usos2_id = new ComboBox();
//         c.cmb_tipo_usos2_id.selected = combo;
//       });
//       this.combos.cmbTipoUsosDos.cmb = this.combos.cmbTipoUsosDos.listado;
//     }
//   });
// }

async abrirModal(id: string, editMode: boolean) {
  const modal = await this.modalCtrl.create({
    component: GestionCatastralComponent,
    componentProps: {
                      id: this.id,
                      contribuyenteNombre : this.contribuyenteNombre,
                      enabled: editMode
                    }
  });

  modal.onDidDismiss().then(() => {
    this.presentarDatosAdicionales();
  });

  modal.present();
}

private presentarDatosAdicionales() {
  this.storage.get(tabla.detalles).then((data: ListaDatosAdicionales[]) => {
    // Descomentar // console log para ver la data
  //  //console.log('datos adicionales', data);
    // Validamos que haya datos, o la tabla en base
    if (data === null) {
      // No existe la tabla, instanciamos un objeto
      this.catastroUrbanoForm.datos_adicionales = [
        new ListaDatosAdicionales(),
      ];
    } else {
      // Existe la tabla, ahora validar si hay registros en ella
      if (data.length > 0) {
        // Si Hay Registros,
        // Validamos que el objeto se encuentre en la base
        const listData = data.filter((c) => c.prediourb_id === this.id);
        if (listData === undefined) {
          // Sino encontramos, contruimos objeto vacio
          this.catastroUrbanoForm.datos_adicionales = [
            new ListaDatosAdicionales(),
          ];
        } else {
          // De lo contrario, asignamos el que viene desde la base.
          listData.forEach((c) => {
            c.cmb_tipo_usos2_id = new ComboBox();
            c.cmb_tipo_usos_id = new ComboBox();
          });
          //  return;
          this.catastroUrbanoForm.datos_adicionales = listData;
        }
      }
    }
    this.cargarTipoUsos();
    this.cargarTipoUsosDos();
  });
}

grabarConstruccion() {

  if (parseInt(this.construccion.bloque) === 0 || this.construccion.bloque === '') {
    this.ui.presentToast('Debe ingresar numero de Bloque');
    return;
  }
  if (parseInt(this.construccion.piso) === 0  || this.construccion.piso === '') {
    this.ui.presentToast('Debe ingresar numero de Piso');
    return;
  }
  if (parseInt(this.construccion.departamento) === 0  || this.construccion.departamento === '') {
    this.ui.presentToast('Debe ingresar numero de Departamento');
    return;
  }
  if (this.construccion.area_const === 0 || this.construccion.area_const === undefined) {
    this.ui.presentToast('Debe ingresar  Área de Construcción.');
    return;
  }
  if (this.construccion.anio_const === 0 || this.construccion.anio_const === undefined ) {
    this.ui.presentToast('Debe ingresar un Año Constr.');
    return;
  }
  const anioActual = new Date();
  if (this.construccion.anio_const < 1800 || this.construccion.anio_const > anioActual.getFullYear()) {
    this.ui.presentToast('Debe ingresar un Año Constr. valido');
    return;
  }


  if (this.cmbTipoUsos.selected !== undefined) {
    if (this.cmbTipoUsos.selected.id !== undefined ) {
      this.construccion.tipo_usos_id = this.cmbTipoUsos.selected.id;
    }  else {
      this.ui.presentToast('Debe Seleccionar Uso de Piso');
      return;
    }
  }

  if (this.cmbTipoUsosDos.selected !== undefined) {
    if ( this.cmbTipoUsosDos.selected.id !== undefined) {
      this.construccion.tipo_usos2_id = this.cmbTipoUsosDos.selected.id;
    } else {
      this.ui.presentToast('Debe Seleccionar Uso de Piso');
      return;
    }
  }

  this.storage.get(tabla.detalles).then((data: DatosAdicionales[]) => {
    const construccion_id = this.construccion.bloque + this.construccion.piso + this.construccion.departamento;
    const existeConstruccion = data.find(c => c.construccion_id === construccion_id && c.prediourb_id === this.id);

    if (existeConstruccion !== undefined) {
      this.ui.presentToast('Ya existe la construccion');
      return;
    }
    this.construccion.construccion_id = construccion_id;
    this.construccion.prediourb_id = this.id;
    this.construccion.fecha_modificacion = new Date();
    this.construccion.estado_modificado = true;
    this.construccion.updated_users =  this.currentUser.name;
    this.construccion.estado_sincronizado = false;
    this.construccion.estado_logico = 'added';
    console.log('this constrccion', this.construccion);
    data.push(this.construccion);
    this.storage.set(tabla.detalles, data);
   this.presentarDatosAdicionales();
    this.ui.presentToast('Informacion Construccion Grabado');
    this.construccion = new DatosAdicionales();
  });
}

grabarArea(idx: number) {
 const construccion = this.catastroUrbanoForm.datos_adicionales[idx];

 this.storage.get(tabla.detalles).then((data: DatosAdicionales[]) => {
    const index = data.findIndex( c => c.construccion_id === construccion.construccion_id && c.prediourb_id === this.id);
  console.log('detalleeee', index, data[index], construccion);
    const dbConstruccion = data[index];
    dbConstruccion.area_const = construccion.area_const;
    data[index] = dbConstruccion;
    this.storage.set(tabla.detalles, data);
    this.ui.presentToast('Area Construccion ' + dbConstruccion.construccion_id + ' Grabado');

  });


}


}
