import { strengthPasswordValidatorReactive } from './strength-password-validator-reactive.directive';
import { FormControl } from '@angular/forms';

describe('strengthPasswordValidatorReactive', () => {
  it('should return null for a valid password', () => {
    const validator = strengthPasswordValidatorReactive();
    const control = new FormControl('StrongP@ss123');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return validation errors for an invalid password', () => {
    const validator = strengthPasswordValidatorReactive();

    // Invalid password with missing symbols
    let control = new FormControl('WeakPassword123');
    let result = validator(control);
    expect(result).toEqual({ strength: { digitsError: false, lettersError: false, symbolsError: true }});

    // Invalid password with missing letters
    control = new FormControl('123456@#$');
    result = validator(control);
    expect(result).toEqual({ strength: { digitsError: false, lettersError: true, symbolsError: false }});

    // Invalid password with missing digits
    control = new FormControl('Password@#$');
    result = validator(control);
    expect(result).toEqual({ strength: { digitsError: true, lettersError: false, symbolsError: false }});
  });

  it('should return null with empty value', () => {
    const validator = strengthPasswordValidatorReactive();
    const control = new FormControl('');
    const result = validator(control);
    expect(result).toBeNull();
  });
});
