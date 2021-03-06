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
// import { MenuPageModule } from './pages/componentes/menu/menu.module';
import { ComponentsModule } from './components/components.module';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

 // import { ComponentesModule } from './pages/componentes/componentes.module';
 // import { MenuPageModule } from '../../componentes/menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
     ComponentsModule,
   // MenuPageModule
   
    ],
   
  providers: [
  //  ComponentesModule,
              ComponentsModule,
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
            Camera,
            File,
            WebView,
            FilePath,
            BackgroundMode
             ],
  exports: [
   // MenuPageModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
