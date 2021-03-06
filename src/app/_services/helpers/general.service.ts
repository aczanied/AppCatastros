import { Injectable } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor( private alertController: AlertController,
               private toastController: ToastController,
               private menuCtrl: MenuController ) { }



onlyNumber($event: any) {
  const key = $event.target.value;
  const regex = /[0-9]+/g;
    if (!regex.test(key) ) {
                    const resp = $event.target.value.match(regex);
                    $event.target.value = resp ? resp.join('')  : '';
    }
 }

  menuActivo(estado: boolean) {
    this.menuCtrl.enable(estado);
  }

  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message: string, timer: number = 2000, ) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: timer
    });
    toast.present();
  }

  createFileName() {
    const d = new Date(),
        n = d.getTime(),
        newFileName = n + '.jpg';
    return newFileName;
  }

  async toastTabla( message: string ) {
    const toast = await this.toastController.create({
      message: `No se encontrĂ³ ${ message }, considere sincronizar!.`,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

}
