import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { StrengthIndicatorModule } from "../strength-indicator/strength-indicator.module";
import { PasswordTdFormComponent } from './password-td-form.component';
import { UtilsModule } from "../../utils/utils.module";
import { PasswordModule } from "../password/password.module";
import { StrengthPasswordValidatorDirective } from "./strength-password-validator.directive";


@NgModule({
  declarations: [
    PasswordTdFormComponent,
    StrengthPasswordValidatorDirective,
  ],
  exports: [
    PasswordTdFormComponent,
    StrengthPasswordValidatorDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,

    StrengthIndicatorModule,
    UtilsModule,
    PasswordModule,
  ]
})
export class PasswordTdFormModule { }
