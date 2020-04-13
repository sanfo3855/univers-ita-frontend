import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthenticationService } from "./services/authentication.service";

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  providers: [AuthenticationService],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [FooterComponent, HeaderComponent]
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
