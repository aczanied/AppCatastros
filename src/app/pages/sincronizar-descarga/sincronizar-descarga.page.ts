import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sincronizar-descarga',
  templateUrl: './sincronizar-descarga.page.html',
  styleUrls: ['./sincronizar-descarga.page.scss'],
})
export class SincronizarDescargaPage implements OnInit {

  // Variables

  public step: number = 1;

  constructor() { }

  ngOnInit() {
  }


  logScrollStart() {

  }

  logScrolling($event) {

  }

  logScrollEnd() { }

  sicronizar() {

    this.step = 2;
  }

}
