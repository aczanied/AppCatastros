import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../_services/seguridad/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Obtener usuario actual desde la base local (navegador)
   
    const currentUser = this.authService.currentUserValue;
   
    if (currentUser) {
      // Verificar que tiene permiso a la accion
      if (route.data.permission != undefined) 
        {  
          // Pendiente de Validar los permisos por pantalla.
          // if (this.authenticationService.haveAccess(route.data.permission)) {
          //  return true;
          // }
          // else {
          //   this.router.navigate(['/error/401']);
          //   return false;
          // }
         
        }
        return true;
      } else
      {
        // Si no hay registros en ese campo, debe loguearse con una redireccion
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
  return false;
}
}
