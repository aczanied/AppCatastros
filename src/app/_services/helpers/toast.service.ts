import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }

  async presentarToast(mensaje: string, duracion: number, posicion: any = 'top') {
    const toast = await this.toast.create({
      position: posicion,
      message: mensaje,
      duration: duracion
    });
    toast.present();
  }
}
