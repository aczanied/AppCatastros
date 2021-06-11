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
 public submitted = false;
  public fLogin: FormGroup;
  constructor(private loginService: AuthService,
              private navCtrl: NavController,
              private router: Router,
              private ui: GeneralService,
             // private menu: MenuComponent
             ) {
                if (this.loginService.currentUserValue) {
                this.router.navigate(['/inicio']);
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
    this.loginService.login(username, password).subscribe(() => {
   // this.menu.currentUser = this.loginService.currentUserValue;
    this.navCtrl.navigateRoot('inicio', { animated: true });
  },
  error => {
    if (error === 'Forbidden') {
      this.ui.presentToast('Usuario o Clave no son correctos');
    } else {
      this.ui.alertaInformativa('No se pudo establecer conexion con el servidor');
    }
  console.log(error);
  });
}


// private grabarToken() {


// }
  //#endregion

}