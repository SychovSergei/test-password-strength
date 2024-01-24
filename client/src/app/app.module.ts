import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { PasswordModule } from "./common/components/password/password.module";
import { PasswordTdFormModule } from "./common/components/password-td-form/password-td-form.module";
import { UtilsModule } from "./common/utils/utils.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // PasswordModule,
    // PasswordTdFormModule,
    // UtilsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
