import { TestBed } from '@angular/core/testing';
import { PasswordStrengthService } from './password-strength.service';
import { EPasswordStrength } from '../enums';

describe('PasswordStrengthService', () => {
  let service: PasswordStrengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrengthService],
    });
    service = TestBed.inject(PasswordStrengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return EPasswordStrength.EMPTY for an empty value', () => {
    const result = service.getStatus('');
    expect(result).toBe(EPasswordStrength.EMPTY);
  });

  it('should return EPasswordStrength.LESS for a value with less than 8 characters', () => {
    const result = service.getStatus('short');
    expect(result).toBe(EPasswordStrength.LESS);
  });

  it('should return EPasswordStrength.EASY for a value with two errors (digits and letters)', () => {
    const result = service.getStatus('weakpassword');
    expect(result).toBe(EPasswordStrength.EASY);
  });

  it('should return EPasswordStrength.MEDIUM for a value with one error (digits)', () => {
    const result = service.getStatus('Medium1234');
    expect(result).toBe(EPasswordStrength.MEDIUM);
  });

  it('should return EPasswordStrength.STRONG for a value without errors', () => {
    const result = service.getStatus('StrongP@ss123');
    expect(result).toBe(EPasswordStrength.STRONG);
  });
});
