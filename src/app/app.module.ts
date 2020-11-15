import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectGuard } from './@core/services/redirect-guard/redirect-guard.service';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { EndComponent } from './pages/end/end.component';
import {TimerService} from './@core/services/timer/timer.service';
import { StatsComponent } from './pages/stats/stats.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AppComponent, AppHomeComponent, EndComponent, StatsComponent, IntroductionComponent, CouponsComponent],
  imports: [CoreModule, BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, NgbModule],
  providers: [RedirectGuard, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
