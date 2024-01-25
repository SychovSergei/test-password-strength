import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

import { DIGITS_REGEXP, LETTERS_REGEXP, SYMBOLS_REGEXP } from "../../../shared/items";

@Directive({
  selector: '[appStrengthValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: StrengthPasswordValidatorDirective,
    multi: true
  }]
})
export class StrengthPasswordValidatorDirective implements Validator {
  private digitsRegExp: RegExp = DIGITS_REGEXP;
  private lettersRegExp: RegExp = LETTERS_REGEXP;
  private symbolsRegExp: RegExp = SYMBOLS_REGEXP;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const digitsError = !this.digitsRegExp.test(control.value);
    const lettersError = !this.lettersRegExp.test(control.value);
    const symbolsError = !this.symbolsRegExp.test(control.value);

    return digitsError || lettersError || symbolsError
      ? { strength: { digitsError, lettersError, symbolsError } }
      : null;
  }

}
