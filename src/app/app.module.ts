import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.modules';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RedirectGuard} from "./@core/services/redirect-guard.service";
import { AppHomeComponent } from './pages/app-home/app-home.component';

@NgModule({
  declarations: [AppComponent, AppHomeComponent],
  imports: [CoreModule,SharedModule,BrowserModule, AppRoutingModule],
  providers: [RedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
