import { StrengthPasswordValidatorDirective } from './strength-password-validator.directive';
import { FormControl } from '@angular/forms';

describe('StrengthPasswordValidatorDirective', () => {
  let directive: StrengthPasswordValidatorDirective;

  beforeEach(() => {
    directive = new StrengthPasswordValidatorDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate correctly', () => {
    const control = new FormControl();

    // Invalid value
    control.setValue('passw');
    let result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: true, lettersError: false, symbolsError: true } });

    control.setValue('123');
    result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: false, lettersError: true, symbolsError: true } });

    control.setValue('!@#');
    result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: true, lettersError: true, symbolsError: false } });

    control.setValue('abcd1234');
    result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: false, lettersError: false, symbolsError: true } });

    control.setValue('abcd!@#');
    result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: true, lettersError: false, symbolsError: false } });

    control.setValue('1234!@#');
    result = directive.validate(control);
    expect(result).toEqual({ strength: { digitsError: false, lettersError: true, symbolsError: false } });

    //Valid value
    control.setValue('StrongP@ss123');
    result = directive.validate(control);
    expect(result).toBeNull();
  });
});
