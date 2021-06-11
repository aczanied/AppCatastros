import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Usuarios, Componente } from './../../../_models';
import { AuthService } from 'src/app/_services/seguridad/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  componentes: Observable<Componente[]>;
public currentUser: Usuarios = new Usuarios();
  pages = [
    {
      title: 'Inicio',
      url: 'inicio',
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
              private router: Router) {
      if (this.auth.currentUserValue !== null) {
        this.currentUser = this.auth.currentUserValue;
      }}

  ngOnInit() {

  }

  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}

