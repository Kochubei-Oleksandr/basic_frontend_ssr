import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import {BrowserLocalStorageService} from "../shared/ssr-services/browser-local-storage.service";
import {ServerLocalStorageService} from "../shared/ssr-services/server-local-storage.service";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: BrowserLocalStorageService,
      useClass: ServerLocalStorageService
    }
  ]
})
export class AppServerModule {}
