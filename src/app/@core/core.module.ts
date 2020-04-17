import { NgModule, Optional, SkipSelf } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
    providers: [],
    exports: [
        HeaderComponent,
        FooterComponent,
        ToolbarComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
    declarations: [FooterComponent, HeaderComponent, ToolbarComponent]
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
