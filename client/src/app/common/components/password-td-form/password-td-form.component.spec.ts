import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { PasswordTdFormComponent } from './password-td-form.component';
import { UtilsModule } from "../../utils/utils.module";
import { StrengthPasswordValidatorDirective } from "./strength-password-validator.directive";
import {PasswordStrengthService} from "../../services/password-strength.service";

describe('PasswordTdFormComponent', () => {
  let component: PasswordTdFormComponent;
  let fixture: ComponentFixture<PasswordTdFormComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordTdFormComponent,
        StrengthPasswordValidatorDirective,
      ],
      imports: [
        FormsModule,
        UtilsModule,
      ],
      providers: [
        PasswordStrengthService,
      ]
    });

    fixture = TestBed.createComponent(PasswordTdFormComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input#password-2'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct default values', () => {
    expect(component.model.password).toEqual('');
    expect(component.passValue).toEqual('');
  });

  it('should update the passValue property on input change', () => {
    const newValue = 'testPassword';
    component.onInputPasswordChange(newValue);
    expect(component.passValue).toEqual(newValue);
  });

  it('password should be invalid at start', async() => {
    fixture.detectChanges();
    await fixture.whenStable();
    let pass = component.form.controls['password'];
    expect(pass.invalid).toBeTruthy();
  });

  it('should display error messages when the password is invalid', fakeAsync(() => {
    component.model.password = 'invPass';
    fixture.detectChanges();
    tick();
    const directiveInstance = inputElement.injector.get(StrengthPasswordValidatorDirective);
    expect(directiveInstance).toBeTruthy();
    expect(component.form.controls['password']?.valid).toBeFalsy();
  }));

});
