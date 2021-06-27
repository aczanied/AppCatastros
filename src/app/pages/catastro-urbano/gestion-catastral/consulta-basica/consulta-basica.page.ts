import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ContribuyentePredio, Combo, Contribuyente , ContribuyenteSelect, CatastroUrbano, DB, LocalData, diccionario } from '../../../../_models';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController, IonInfiniteScroll, ModalController, NavController, Platform } from '@ionic/angular';
import { LocaldbService } from 'src/app/_services/helpers/localdb.service';
import { GeneralService } from 'src/app/_services/helpers/general.service';
import { GestionCatastralComponent } from './../../../../components/catastro-urbano/gestion-catastral/gestion-catastral.component';


@Component({
  selector: 'app-consulta-basica',
  templateUrl: './consulta-basica.page.html',
  styleUrls: ['./consulta-basica.page.scss'],
})

export class ConsultaBasicaPage implements OnInit {

  public contribuyentes: ContribuyentePredio = new ContribuyentePredio();
  public busqueda:  Contribuyente[] = [];
  public contribuyenteResultado:  ContribuyenteSelect = new ContribuyenteSelect();
  public data: CatastroUrbano[] = [];

  private tbl: DB = new DB();
  private dbo: LocalData[] = diccionario;
  private tblContribuyentePredio: LocalData = new LocalData();


  public selected = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  // data: any[] = Array(20);

  constructor(private storage: Storage,
              private modalCtrl: ModalController,
              private ui: GeneralService,
              public alertController: AlertController,
              private navCtrl: NavController,
              private db: LocaldbService,
              private plt: Platform) {
                this.contribuyenteResultado.predios = [];
   }


  ngOnInit() {
    // Esperar al inicio de los componentes nativos de la plataforma
    this.plt.ready().then(() => {

        // Filtramos las tablas que tienen api
        this.tblContribuyentePredio = this.dbo.find( c => c.esUrbano === true && c._id === this.tbl.ContribuyentePredio);

        // Validar que se encontro la tabla
        if (!this.tblContribuyentePredio) {
          this.tblContribuyentePredio = new LocalData();
          
        }
       
        this.db.buscarPrimerElemento(this.tblContribuyentePredio.tablaBase).then(tabla => {
         
          if (!tabla) {
            this.presentarAlertDatos();
          }
          else {
            this.contribuyentes = tabla.data;
          }
            return true;
          }).catch( error => {
            return false;
          });
      });
  }

  private async presentarAlertDatos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion!',
      message: 'No hay Informacion de Contribuyentes! Desea Sincronizar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí, Sincroniza!',
          handler: () => {
           this.navCtrl.navigateRoot('urbano/sync-descarga');
          }
        }
      ]
    });

    await alert.present();
  }



async abrirModal(id: string, editMode: boolean) {
  const modal = await this.modalCtrl.create({
    component: GestionCatastralComponent,
    componentProps: {
                      id: id,
                      contribuyenteNombre : this.contribuyenteResultado.contribuyente.nombres,
                      enabled: editMode
                    }
  });
  modal.present();
}


/**
 * Busca en los registros locales toda la informacion basica del contribuyente
 *
 * @param {*} $event
 * @memberof ConsultaBasicaPage
 */
buscar($event: any) {

  console.log('levanto evento');
  const texto: string = $event.text;
 
    this.busqueda =  [];
    const resultadoClaves = this.contribuyentes.catastrourbano
                                          .map(c => ({ clave: c.clave , contribuyente_id: c.contribuyente_id }))
                                          .filter(data => data.clave.includes(texto.toUpperCase())).slice(0, 5);
  console.log('resultadoClaves', resultadoClaves);
   const contribFiltrados =  [...new Set(resultadoClaves.map(c => c.contribuyente_id))];
  if (contribFiltrados.length > 0) {
    contribFiltrados.forEach(idContribuyente => {
        const contribuyente = this.contribuyentes.contribuyentes.find( contrib => contrib.id === idContribuyente);
        this.busqueda.push(contribuyente);
      });
  }

  const resultadoCedula = this.contribuyentes.contribuyentes.filter(data => data.identificacion.includes(texto.toUpperCase())
                                                                         || data.nombres.includes(texto.toUpperCase())).slice(0, 5);
  if (resultadoCedula.length > 0) {
    resultadoCedula.forEach( c => {
      this.busqueda.push(c);
    });
  }
  console.log('antes', this.busqueda);
  this.busqueda.forEach(c => { 
          c.nombreCompleto = c.identificacion + '-' + c.nombres;
  });
  console.log('despues', this.busqueda);
}



/**
 * Se inicia cuando el selector es seleccionado
 * Busca los predios asociados al contribuyente seleccionado
 * @param {*} event
 * @memberof ConsultaBasicaPage
 */
onChangeBuscar(event: any ) {

 console.log(event);
 this.selected = true;
 this.contribuyenteResultado.contribuyente = event.value;

   const resultadoPredio = this.contribuyentes.catastrourbano
                                         .filter( c => c.contribuyente_id === this.contribuyenteResultado.contribuyente.id)
                                         .slice(0, 50);
  this.contribuyenteResultado.predios = resultadoPredio;
  this.data = this.contribuyenteResultado.predios.slice(0, 15);

}

loadData(event) {
  setTimeout(() => {
    const start =  this.data.length ;
    const end = start + 15;
    if ( this.data.length > 50 ) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

    this.data.push( ...this.contribuyenteResultado.predios.slice(start, end) );
    event.target.complete();

  }, 200 );
}

}

