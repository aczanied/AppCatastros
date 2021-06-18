import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment , } from '../../../environments/environment';
import { Usuarios } from './../../_models';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  // Variables
  private currentUserSubject: BehaviorSubject<Usuarios>;
  public currentUser: Observable<Usuarios>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<Usuarios>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

// Metodos

/**
 * Obtener el Usuario Logueado
 * @readonly
 * @type {Usuarios}
 * @memberof AuthService
 */
public get currentUserValue(): Usuarios {
  return this.currentUserSubject.value;
}


login(username: string, password: string) {
  return this.http.post<any>(`${environment.apiUrl}loginmobile`, { username, password })
      .pipe(map(user => {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
      }));
}

public isLogin() {
  const path = '/catastro-urbano/is-login';
  const url =  `${environment.apiUrl}${path}`;
  return this.http.get<any[]>(url);
}

logout() {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

}


