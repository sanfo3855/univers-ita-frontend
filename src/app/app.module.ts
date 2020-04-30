import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectGuard } from './@core/services/redirect-guard/redirect-guard.service';
import { AppHomeComponent } from './pages/app-home/app-home.component';

@NgModule({
  declarations: [AppComponent, AppHomeComponent],
  imports: [CoreModule, BrowserModule, FormsModule, AppRoutingModule],
  providers: [RedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
