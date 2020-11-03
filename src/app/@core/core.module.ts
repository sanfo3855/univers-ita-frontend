import {NgModule, Optional, SkipSelf} from '@angular/core';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {QuestionComponent} from './components/question/question.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { NgbdModalConfirm, NgbdModalConfirmAutofocus, NgbdModalFocus } from './components/modal-focus/modal-focus.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineQuestionsComponent } from './components/inline-questions/inline-questions.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';


@NgModule({
  providers: [],
  exports: [HeaderComponent, FooterComponent, ToolbarComponent, QuestionComponent, LoginFormComponent, CreateUserFormComponent,
    NgbdModalFocus],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule],
  declarations: [FooterComponent, HeaderComponent, ToolbarComponent, QuestionComponent, LoginFormComponent,
    CreateUserFormComponent, NgbdModalFocus, NgbdModalConfirm, NgbdModalConfirmAutofocus, InlineQuestionsComponent, SpinnerLoadingComponent],
  bootstrap: [NgbdModalFocus],
  entryComponents: [NgbdModalConfirm, NgbdModalConfirmAutofocus]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
