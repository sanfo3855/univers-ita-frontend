import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./pages/login/login.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {SurveyComponent} from "./pages/survey/survey.component";
import {WritingComponent} from "./pages/writing/writing.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

import {CoreModule} from "./@core/core.module";
import {RedirectGuard} from "./@core/services/redirect-guard.service";

const routes: Routes = [
  {path: 'home', canActivate: [RedirectGuard], component: RedirectGuard, data :{externalUrl:'https://site.unibo.it/univers-ita'}},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'writing', component: WritingComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [LoginComponent, AdminComponent,SurveyComponent,WritingComponent,PageNotFoundComponent],
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
