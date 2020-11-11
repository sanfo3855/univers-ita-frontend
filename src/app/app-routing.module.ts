import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {AdminComponent} from './pages/admin/admin.component';
import {WritingComponent} from './pages/writing/writing.component';
import {SurveyComponent} from './pages/survey/survey.component';
import {EndComponent} from './pages/end/end.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

import {CoreModule} from './@core/core.module';
import {RedirectGuard} from './@core/services/redirect-guard/redirect-guard.service';
import {AppHomeComponent} from './pages/app-home/app-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthorizeAdminGuard} from './@core/services/authorize-guard/authorize-admin.guard';
import {AuthorizeStudentGuard} from './@core/services/authorize-guard/authorize-student.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CustomInterceptor} from './@core/services/backend-api/backend-api.service';
import {HttpClientModule} from '@angular/common/http';
import {LoggedGuard} from './@core/services/logged-guard/logged.guard';
import {StatsComponent} from './pages/stats/stats.component';
import {CommonModule} from '@angular/common';
import {IntroductionComponent} from "./pages/introduction/introduction.component";

const routes: Routes = [
  {path: '', redirectTo: 'landing page', pathMatch: 'full'},
  {path: 'home', canActivate: [RedirectGuard], component: RedirectGuard, data: {externalUrl: 'https://site.unibo.it/univers-ita'}},
  {path: 'landing page', component: AppHomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: 'introduzione', component: IntroductionComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthorizeAdminGuard, LoggedGuard]},
  {path: 'questionario', pathMatch: 'full', component: SurveyComponent, canActivate: [AuthorizeStudentGuard, LoggedGuard]},
  {path: 'scrittura', component: WritingComponent, canActivate: [AuthorizeStudentGuard, LoggedGuard]},
  {path: 'fine', component: EndComponent, canActivate: [AuthorizeStudentGuard, LoggedGuard]},
  {path: 'monitoraggio', component: StatsComponent, canActivate: [AuthorizeAdminGuard, LoggedGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [LoginComponent, AdminComponent, SurveyComponent, WritingComponent, PageNotFoundComponent],
  imports: [RouterModule.forRoot(routes, {useHash: true}), CoreModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true}]
})
export class AppRoutingModule {
}
