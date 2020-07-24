import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectGuard } from './@core/services/redirect-guard/redirect-guard.service';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { EndComponent } from './pages/end/end.component';
import {TimerService} from './@core/services/timer/timer.service';
import { StatsComponent } from './pages/stats/stats.component';

@NgModule({
  declarations: [AppComponent, AppHomeComponent, EndComponent, StatsComponent],
  imports: [CoreModule, BrowserModule, FormsModule, AppRoutingModule, ModalModule.forRoot()],
  providers: [RedirectGuard, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
