import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PasswordComponent } from './password.component';
import { StrengthIndicatorModule } from "../strength-indicator/strength-indicator.module";


@NgModule({
  declarations: [
    PasswordComponent,
  ],
  exports: [
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    StrengthIndicatorModule,
  ],

})
export class PasswordModule {}
