import { NgModule } from "@angular/core";

import { PasswordStrengthDirective } from "./password-strength.directive";


@NgModule({
  imports: [],
  declarations: [
    PasswordStrengthDirective,
  ],
  exports: [
    PasswordStrengthDirective,
  ]
})
export class UtilsModule {}
