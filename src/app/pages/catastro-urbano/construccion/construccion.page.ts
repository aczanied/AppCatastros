import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { ContribuyentePredio, Combo, Contribuyente , ContribuyenteSelect, CatastroUrbano } from '../../../models';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
// import { tabla } from '../../../models/catalogo-tablas';
// import { ConstruccionComponent } from '../../../componentes/catastro-urbano/construccion/construccion.component';

@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.page.html',
  styleUrls: ['./construccion.page.scss'],
})

export class ConstruccionPage implements OnInit, AfterViewInit {
  // public contribuyentes: ContribuyentePredio = new ContribuyentePredio();
  // public busqueda:  Contribuyente[] = [];
  // public contribuyenteResultado:  ContribuyenteSelect = new ContribuyenteSelect();
  // public data: CatastroUrbano[] = [];
  public selected = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  // data: any[] = Array(20);

  constructor(private storage: Storage,
              private modalCtrl: ModalController,
              private plt: Platform) {
                // this.contribuyenteResultado.predios = [];
   }

  ngOnInit() {
    // Do Nothing at init
  }

  ngAfterViewInit() {
    // Esperar al inicio de los componentes nativos de la plataforma
    this.plt.ready().then(() => {
    //  this.cargarDatos();
    });

    }

// async abrirModal(id: string, editMode: boolean) {
//   const modal = await this.modalCtrl.create({
//     component: ConstruccionComponent,
//     componentProps: {
//                       id: id,
//                       contribuyenteNombre : this.contribuyenteResultado.contribuyente.nombres,
//                       enabled: editMode
//                     }
//   });
//   modal.present();
// }

// buscar($event: any) {

//   const texto: string = $event.text;
//   this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//    this.busqueda =  [];
//    const resultadoClaves = contribuyentes.catastrourbano
//                                          .map(c => ({ clave: c.clave , contribuyente_id: c.contribuyente_id }))
//                                          .filter(data => data.clave.includes(texto.toUpperCase())).slice(0, 5);

//   const contribFiltrados =  [...new Set(resultadoClaves.map(c => c.contribuyente_id))];
//  if (contribFiltrados.length > 0) {
//    contribFiltrados.forEach(idContribuyente => {
//        const contribuyente = contribuyentes.contribuyentes.find( contrib => contrib.id === idContribuyente);
//        this.busqueda.push(contribuyente);
//      });
//  }

//  const resultadoCedula = contribuyentes.contribuyentes.filter(data => data.identificacion.includes(texto.toUpperCase())
//                                                                         || data.nombres.includes(texto.toUpperCase())).slice(0, 5);
//  if (resultadoCedula.length > 0) {
//    resultadoCedula.forEach( c => {
//      this.busqueda.push(c);
//    });
//  }
//  this.busqueda.forEach(c => { c.nombres = c.identificacion + ' - ' + c.nombres; });
//  });

//   // const texto: string = $event.text;
//   // // console.log(this.contribuyentes);
//   // this.busqueda =  [];
//   //  this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//   //   const resultadoClaves = contribuyentes.catastrourbano
//   //                                         .map(c => ({ clave: c.clave , contribuyente_id: c.contribuyente_id }))
//   //                                         .filter(data => data.clave.includes(texto.toUpperCase())).slice(0, 5);

//   //  const contribFiltrados =  [...new Set(resultadoClaves.map(c => c.contribuyente_id))];
//   // if (contribFiltrados.length > 0) {
//   //   contribFiltrados.forEach(idContribuyente => {
//   //       const contribuyente = contribuyentes.contribuyentes.find( contrib => contrib.id === idContribuyente);
//   //       this.busqueda.push(contribuyente);
//   //     });
//   // }

//   // const resultadoCedula = contribuyentes.contribuyentes.filter(data => data.identificacion.includes(texto.toUpperCase())
//   //                                                                        || data.nombres.includes(texto.toUpperCase())).slice(0, 5);
//   // if (resultadoCedula.length > 0) {
//   //   resultadoCedula.forEach( c => {
//   //     this.busqueda.push(c);
//   //   });
//   // }
//   // this.busqueda.forEach(c => { c.nombres = c.identificacion + ' - ' + c.nombres; });

//   // });
// }

// onChangeBuscar(event: any ) {
//  //  debugger;
//  // debugger;
//  this.selected = true;
//  this.contribuyenteResultado.contribuyente = event.value;
//  this.storage.get(tabla.contribuyente_predio).then((contribuyentes: ContribuyentePredio) => {
//    const resultadoPredio = contribuyentes.catastrourbano
//                                          .filter( c => c.contribuyente_id === this.contribuyenteResultado.contribuyente.id)
//                                          .slice(0, 50);

//  // console.log(resultadoPredio);
//   this.contribuyenteResultado.predios = resultadoPredio;
//   this.data = this.contribuyenteResultado.predios.slice(0, 15);
//  });

// }

// loadData(event) {
//   setTimeout(() => {
//     const start =  this.data.length ;
//     const end = start + 15;
//     if ( this.data.length > 50 ) {
//       event.target.complete();
//       this.infiniteScroll.disabled = true;
//       return;
//     }

//     this.data.push( ...this.contribuyenteResultado.predios.slice(start, end) );
//     event.target.complete();

//   }, 200 );
// }

}

