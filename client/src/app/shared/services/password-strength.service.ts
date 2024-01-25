import { Injectable } from "@angular/core";
import { EPasswordStrength } from "../enums";
import { DIGITS_REGEXP, LETTERS_REGEXP, SYMBOLS_REGEXP } from "../items";

@Injectable()
export class PasswordStrengthService {

  public getStatus(value: string): EPasswordStrength {

    const digitsError = !DIGITS_REGEXP.test(value);
    const lettersError = !LETTERS_REGEXP.test(value);
    const symbolsError = !SYMBOLS_REGEXP.test(value);

    if (!value.length) {
      return EPasswordStrength.EMPTY;
    }
    if (value.length < 8) {
      return EPasswordStrength.LESS;
    } else {
      const res = { digitsError, lettersError, symbolsError }
      const keys: string[] = Object.keys(res).filter((key) => res[key as keyof object]);

      if (keys.length === 2) {
        return EPasswordStrength.EASY;
      }
      if (keys.length === 1) {
        return EPasswordStrength.MEDIUM;
      }
      if (!keys.length) {
        return EPasswordStrength.STRONG;
      }
    }

    return EPasswordStrength.EMPTY;
  }

}
