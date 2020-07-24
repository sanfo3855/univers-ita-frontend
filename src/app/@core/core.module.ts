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
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';


@NgModule({
  providers: [],
    exports: [HeaderComponent, FooterComponent, ToolbarComponent, QuestionComponent, LoginFormComponent, CreateUserFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [FooterComponent, HeaderComponent, ToolbarComponent, QuestionComponent, LoginFormComponent, CreateUserFormComponent, PopupModalComponent]
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
