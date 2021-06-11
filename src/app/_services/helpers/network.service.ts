import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from './toast.service';

export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private network: Network,
              private toast: ToastService,
              private plt: Platform) {

                this.plt.ready().then(() => {
                  this.initializeNetworkEvents();
                  let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;

                  this.status.next(status);
                  
                })
               }


  private initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        
        console.log('Desconectados');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        
        console.log('Conectados');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    })
   
  }

  private updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    let conection = status == ConnectionStatus.Offline ? 'Sin Conexion!': 'Conectado a la red!';
    this.toast.presentarToast(conection, 3000);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }


}
