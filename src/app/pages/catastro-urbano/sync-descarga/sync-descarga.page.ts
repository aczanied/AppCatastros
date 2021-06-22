import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { diccionario, LocalData } from '../../../_models';
import { CombosService } from '../../../_services';

@Component({
  selector: 'app-sync-descarga',
  templateUrl: './sync-descarga.page.html',
  styleUrls: ['./sync-descarga.page.scss'],
})
export class SyncDescargaPage implements OnInit {


  // Variables
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon: ElementRef;
  @ViewChild('card', { read: ElementRef }) card: ElementRef;
  @ViewChild('cartFabBtn', { read: ElementRef }) cartFabBnt: ElementRef;

  public step: number = 1;
  public progressBar = 0;
  public syncOk:boolean = true;
  public iteracion = 1 / 5; // 68;
  public listaSincronizado = [];
  private dbo: LocalData[] = diccionario;
  
  constructor(private animationCtrl: AnimationController,
              private combosSV: CombosService) {

   
   }

   startLoad() {

    const loadingAnimation = this.animationCtrl.create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(1500)
      .iterations(3)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

    // Don't forget to start the animation!
    loadingAnimation.play();
  }
  
 
 private iterar(message: string, status: boolean, im: any) {

    this.progressBar = this.progressBar + this.iteracion;
    const obj = {
      message: message,
      success: status,
      innerMessage: im
    };
    this.listaSincronizado.push(obj);
    this.listaSincronizado.sort(this.compareValues('success', 'asc'));
  }

  private compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  ngOnInit() {

  }


  logScrollStart() {

  }

  logScrolling($event) {

  }

  logScrollEnd() { }

  sicronizar() {
    this.listaSincronizado = [];
    this.progressBar = 0;
    this.startLoad();
    this.step = 1.5;
    setTimeout(()=>{                     
      this.step =  2;
      this.sincronizarCombos();

 }, 500);
  }

  private sincronizarCombos() {
    this.syncOk = true;
    // Filtramos las tablas que tienen api
     this.dbo.filter( c => c.api === true ).forEach( item => {
      
     
      this.combosSV.obtenerCombo(item.ruta, item.tablaBase).subscribe( data => {
 
          if(data === null) {
             // Avanzar la iteracion y poner mensaje de FALLO
             this.iterar(item._id, false, '');
             this.syncOk = false;
             return;
          }
          data.then( c => {
            this.iterar(item._id, true, '');

            if ((this.progressBar * 100) === 100) {
             
              setTimeout(()=>{ 
                this.step = 2.5;
                setTimeout(()=>{ 
                        if (this.syncOk) {
                          this.step =  3;
                        } 
                        else {
                          this.step =  4;
                        }           
                  
             }, 500);                 
             
           }, 2000);
            }
          });
           // Avanzar la iteracion y poner mensaje de OK
        },
        error => {
          // Avanzar la iteracion y poner mensaje de FALLO
          this.syncOk = false;
          this.iterar(item._id, false, '');
        });
    
 
   });
 
 }


}
