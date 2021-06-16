import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-sincronizar-descarga',
  templateUrl: './sincronizar-descarga.page.html',
  styleUrls: ['./sincronizar-descarga.page.scss'],
})
export class SincronizarDescargaPage implements OnInit {

  // Variables
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon: ElementRef;
  @ViewChild('card', { read: ElementRef }) card: ElementRef;
  @ViewChild('cartFabBtn', { read: ElementRef }) cartFabBnt: ElementRef;
  public step: number = 1;

  constructor(private animationCtrl: AnimationController) {

   
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
  
 

  animateCard() {
    const cardAnimation = this.animationCtrl.create('ease-in-card')
    .addElement(this.card.nativeElement)
    .duration(1500)
    .iterations(3)
    .easing('easing-out');

    cardAnimation.play();
  }

  ngOnInit() {

    const doc = document.querySelector('.square');
    console.log(doc);
    this.animationCtrl.create()
    .addElement(doc)
    .duration(1500)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');

  }


  logScrollStart() {

  }

  logScrolling($event) {

  }

  logScrollEnd() { }

  sicronizar() {
    this.startLoad();
    this.step = 1.5;
    setTimeout(()=>{                     
      this.step =  2;
 }, 500);
  //  this.step =  2;

   
  }

}
