import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DIGITS_REGEXP, LETTERS_REGEXP, SYMBOLS_REGEXP } from "../../../shared/items";

export function strengthPasswordValidatorReactive(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const digitsError = !DIGITS_REGEXP.test(control.value);
    const lettersError = !LETTERS_REGEXP.test(control.value);
    const symbolsError = !SYMBOLS_REGEXP.test(control.value);

    return digitsError || lettersError || symbolsError
      ? { strength: { digitsError, lettersError, symbolsError }}
      : null
  };

}
