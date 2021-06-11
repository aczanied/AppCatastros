import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/seguridad/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {

      
        if ([401].indexOf(err.status) !== -1) {

          // console.log('Etron');
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authService.logout();
          this.router.navigate(['login'], {
           // queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
  
        if ([405].indexOf(err.status) !== -1) {
          // Unauthorized or 405 Forbidden response returned from api
         // this.toast.warning('No tiene los permisos necesarios para realizar esta acción.', 'Información del Sistema');
        }
  
        //const error = err.error err.error.message || err.statusText;
        if ( err.error && err.error.ModelState) {
          Object.keys(err.error.ModelState).forEach(key => {
            err.error.ModelState[key].forEach(m => {
           //   this.toast.error(m, 'Información del Sistema');
            });
          });
        }
        else {
          // if ( err.error.error_description) {

          //       this.toast.error(err.error.error_description, 'Información del Sistema');
          // }
        }
        return throwError(err);
      
      })
    );
  }
}