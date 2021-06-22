import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
// import { Componente } from '../../interfaces/interfaces';
// import { DataService } from '../../services/data.service';
// import { Observable } from 'rxjs';
// import { UiService } from '../../services/ui-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  // componentes: Observable<Componente[]>;


  constructor( private menuCtrl: MenuController,
              // private dataService: DataService,
               private modalCtrl: ModalController,
               // private uiService: UiService
               ) { }

  ngOnInit() {

 //   this.componentes = this.dataService.getMenuOpts();
  }
  ionViewWillEnter() {
 //   this.uiService.menuActivo(true);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  toggleMenu() {
    this.menuCtrl.toggle();
  }

}


