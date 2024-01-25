import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StrengthIndicatorComponent } from "./strength-indicator.component";
import { PasswordStrengthService } from "../../../shared/services/password-strength.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    StrengthIndicatorComponent,
  ],
  exports: [
    StrengthIndicatorComponent,
  ],
  providers: [
    PasswordStrengthService,
  ]
})
export class StrengthIndicatorModule {}
