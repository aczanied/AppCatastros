import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Storage } from '@ionic/storage/';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';

import { JwtInterceptor } from './_guards/jwt.interceptor';
import { UnauthorizedInterceptor } from './_guards/unauthorized.interceptor';
import { MenuPageModule } from './pages/componentes/menu/menu.module';

 import { ComponentesModule } from './pages/componentes/componentes.module';
// import { MenuPageModule } from '../../componentes/menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
     ComponentesModule,
    //MenuPageModule
    ],
   
  providers: [
    ComponentesModule,
              Network,
              Storage,
             { provide: RouteReuseStrategy,
               useClass: IonicRouteStrategy 
             },
             {provide: HTTP_INTERCEPTORS, 
              useClass: JwtInterceptor, 
              multi: true 
             },
            { provide: HTTP_INTERCEPTORS,
              useClass: UnauthorizedInterceptor,
              multi: true,
            },
             ],
  bootstrap: [AppComponent],
})
export class AppModule {}
