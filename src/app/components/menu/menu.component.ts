import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Usuarios, Componente } from './../../_models';
import { AuthService } from 'src/app/_services/seguridad/auth.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;
public currentUser: Usuarios = new Usuarios();

public listaMenu: any[] = [];
  public menuUrbano = [
    {
      title: 'Inicio',
      url: 'urbano',
      icon: 'home',
      open: false,
      children: []
    },
    {
      title: 'Catastro Urbano',
      url: '',
      icon: 'grid',
      open: false,
      children: [
        {
          title: 'Consulta Básica',
          url: 'catastro-urbano/gestion/consulta-basica',
          icon: 'bookmark',
          open: false
        },
        {
          title: 'Crear Predio',
          url: 'catastro-urbano/gestion/predios',
          icon: 'bookmark',
          open: false
        },
        {
          title: 'Crear Construcción',
          url: 'catastro-urbano/gestion/construccion',
          icon: 'bookmark',
          open: false
        },
      ]
    },
    {
      title: 'Sincronizacion',
      url: '',
      icon: 'sync',
      open: false,
      children: [
        {
          title: 'Subir Información',
          url: 'carga',
          icon: 'bookmark',
          open: false
        },
        {
          title: 'Descargar Información',
          url: 'sincronizar',
          icon: 'bookmark',
          open: false
        }
      ]
    },
    // {
    //   title: 'Sincronizar',
    //   url: 'sincronizar',
    //   icon: 'sync',
    //   open: false,
    //   children: []
    // }
  ];

  constructor(private auth: AuthService,
               private navCtrl: NavController,
               private menu: MenuController,
              private router: Router) {
      if (this.auth.currentUserValue !== null) {
        this.currentUser = this.auth.currentUserValue;
      }}

  ngOnInit() {
this.listaMenu = this.menuUrbano;
  }
  public navegar(ruta: any) {
    console.log(ruta);
    this.navCtrl.navigateRoot(ruta, { animated: true });
  }
  salir() {
    console.log('saliemnd')
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}

