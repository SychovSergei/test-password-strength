import {ComponentFixture, TestBed} from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import {UtilsModule} from "../../utils/utils.module";
import {StrengthIndicatorModule} from "../strength-indicator/strength-indicator.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EPasswordStrength} from "../../enums";
import {IRequestData} from "../../models/password-form.interface";
import {PasswordStrengthService} from "../../services/password-strength.service";

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StrengthIndicatorModule,
        UtilsModule,
      ],
      providers: [
        PasswordStrengthService
      ]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct default values', () => {
    expect(component.passwordForm).toBeDefined();
    expect(component.passwordForm.get('password')?.value).toEqual('');
  });

  it('should initialize the passwordStatus with correct default values EMPTY', () => {
    expect(component.passwordStatus).toEqual(EPasswordStrength.EMPTY);
  });


  it('should update passwordStatus when password value changes', () => {
    component.ngOnInit();

    //for EMPTY password status
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('');
    expect(component.passwordStatus).toEqual(EPasswordStrength.EMPTY);

    //for LESS password status
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('newPass');
    expect(component.passwordStatus).toEqual(EPasswordStrength.LESS);
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('123456');
    expect(component.passwordStatus).toEqual(EPasswordStrength.LESS);
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('!@$&');
    expect(component.passwordStatus).toEqual(EPasswordStrength.LESS);

    //for EASY password status
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('newPassword');
    expect(component.passwordStatus).toEqual(EPasswordStrength.EASY);

    //for MEDIUM password status
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('newPass123');
    expect(component.passwordStatus).toEqual(EPasswordStrength.MEDIUM);
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('newPass!#$');
    expect(component.passwordStatus).toEqual(EPasswordStrength.MEDIUM);
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('123456!#$');
    expect(component.passwordStatus).toEqual(EPasswordStrength.MEDIUM);

    //for STRONG password status
    fixture.detectChanges();
    component.passwordForm.controls['password'].setValue('pass123456!#$');
    expect(component.passwordStatus).toEqual(EPasswordStrength.STRONG);

  });

  it('should the password field is invalid at start', () => {
    expect(component.passwordForm.controls['password'].valid).toBeFalse();
  });

  it('should assign the password field with value', () => {
    const val = 'myValue'
    component.passwordForm.controls['password'].setValue(val)
    expect(component.passwordForm.controls['password'].value).toEqual(val);
    expect(component.passwordForm.controls['password'].valid).toBeFalsy();
  });

  it('should the password field with value abcd1234! is valid', () => {
    const val: string = 'abcd1234!';
    component.passwordForm.controls['password'].setValue(val);
    expect(component.passwordForm.controls['password'].value).toEqual(val);
    expect(component.passwordForm.controls['password'].valid).toBeTruthy();
  });

  it('should the error message contains different values', () => {
    component.passwordForm.controls['password'].setValue('abcd');
    fixture.detectChanges();
    let errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('letters');

    component.passwordForm.controls['password'].setValue('1234');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('numbers');

    component.passwordForm.controls['password'].setValue('!!!');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('symbols');

    component.passwordForm.controls['password'].setValue('123!!!');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('numbers');
    expect(errorMessage).not.toContain('symbols');

    component.passwordForm.controls['password'].setValue('abcd!!!');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('letters');
    expect(errorMessage).not.toContain('symbols');

    component.passwordForm.controls['password'].setValue('abcd1234');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage').textContent;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).not.toContain('letters');
    expect(errorMessage).not.toContain('numbers');

    component.passwordForm.controls['password'].setValue('abcd1234!');
    fixture.detectChanges();
    errorMessage = fixture.nativeElement.querySelector('#errorMessage');
    expect(errorMessage).toBeNull();
  });

  it('should not submit when form is invalid', () => {
    const testData: IRequestData = { password: '123' };
    const invalidPassword: string = '123';
    component.passwordForm.controls['password'].setValue(invalidPassword);
    fixture.detectChanges();
    component.submit();

    expect(component.passwordForm.invalid).toBeTruthy();
    expect(component['finalData']).not.toEqual(testData);
  });

  it('should submit when form is valid', () => {
    const testData: IRequestData = { password: '1234abcd!' };
    const validPassword: string = '1234abcd!';
    component.passwordForm.controls['password'].setValue(validPassword);
    fixture.detectChanges();
    component.submit();

    expect(component.passwordForm.valid).toBeTruthy();
    expect(component['finalData']).toEqual(testData);
  });

});
