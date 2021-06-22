import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
  //  loadChildren: () => import('./pages/decidir/decidir.module').then( m => m.DecidirPageModule)
  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'menu',
    loadChildren: () => import('./pages/componentes/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'decidir',
    loadChildren: () => import('./pages/decidir/decidir.module').then( m => m.DecidirPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'sincronizar-descarga',
    loadChildren: () => import('./pages/sincronizar-descarga/sincronizar-descarga.module').then( m => m.SincronizarDescargaPageModule)
  },
  {
    path: 'descargar-datos',
    loadChildren: () => import('./pages/catastro-urbano/descargar-datos/descargar-datos.module').then( m => m.DescargarDatosPageModule)
  },
  {
    path: 'cargar-datos',
    loadChildren: () => import('./pages/catastro-urbano/cargar-datos/cargar-datos.module').then( m => m.CargarDatosPageModule)
  },
  {
    path: 'sync-carga',
    loadChildren: () => import('./pages/catastro-urbano/sync-carga/sync-carga.module').then( m => m.SyncCargaPageModule)
  },
  {
    path: 'sync-descarga',
    loadChildren: () => import('./pages/catastro-urbano/sync-descarga/sync-descarga.module').then( m => m.SyncDescargaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
