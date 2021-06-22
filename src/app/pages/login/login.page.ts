import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, Validators, FormGroup } from '@angular/forms';
// import { DatabaseService } from '../../services/Database/database.service';
// import { AuthenticationService } from '../../services/web/login.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/seguridad/auth.service';
import { GeneralService } from 'src/app/_services/helpers/general.service';
// import { UiService } from '../../services/ui-service.service';
// import { MenuComponent } from '../../componentes/menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser = {
    email: '',
    password: ''
  };

  // Variables
  public submitted = false;
  public fLogin: FormGroup;
  public mostrarClave: boolean = false;
  constructor(private loginService: AuthService,
              private navCtrl: NavController,
              private router: Router,
              private ui: GeneralService,
             // private menu: MenuComponent
             ) {
              
              }

 ionViewWillEnter() {
  console.log('ingresando al login');
  if (this.loginService.currentUserValue) {
    // this.router.navigate(['/inicio']);
     this.router.navigate(['/decidir']);
     }
              }

  ngOnInit() {
   // this.verificarBase();
  }




  //#region Funciones
public login(fLogin: NgForm) {
  this.submitted = true;
  if (fLogin.invalid) {
    return;
  } else {
    this.loginServidor(this.loginUser.email, this.loginUser.password );
  }
}

private loginServidor(username: string, password: string) {

  this.navCtrl.navigateRoot('decidir', { animated: true });
 
  
    this.loginService.login(username, password).subscribe(() => {
   // this.menu.currentUser = this.loginService.currentUserValue;
    this.navCtrl.navigateRoot('decidir', { animated: true });
  },
  error => {
    if (error.status === 403) {
      this.ui.presentToast('Usuario o Clave no son correctos');
    } else {
      this.ui.alertaInformativa('No se pudo establecer conexion con el servidor');
    }
  
  });
}

public mostrarClaveFn() {
this.mostrarClave = !this.mostrarClave;
}


// private grabarToken() {


// }
  //#endregion

}