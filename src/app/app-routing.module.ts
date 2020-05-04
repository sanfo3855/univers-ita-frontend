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

const routes: Routes = [
  {path: '', redirectTo: 'app-home', pathMatch: 'full'},
  {path: 'home', canActivate: [RedirectGuard], component: RedirectGuard, data: {externalUrl: 'https://site.unibo.it/univers-ita'}},
  {path: 'app-home', component: AppHomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthorizeAdminGuard]},
  {path: 'survey', component: SurveyComponent, canActivate: [AuthorizeStudentGuard]},
  {path: 'writing', component: WritingComponent, canActivate: [AuthorizeStudentGuard]},
  {path: 'end', component: EndComponent, canActivate: [AuthorizeStudentGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [LoginComponent, AdminComponent, SurveyComponent, WritingComponent, PageNotFoundComponent],
  imports: [RouterModule.forRoot(routes), CoreModule, ReactiveFormsModule, HttpClientModule],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true}]
})
export class AppRoutingModule {
}
