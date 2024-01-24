import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PasswordStrengthDirective } from './password-strength.directive';
import { StrengthIndicatorComponent } from '../components/strength-indicator/strength-indicator.component';
import { PasswordStrengthService } from '../services/password-strength.service';
import { EPasswordStrength } from '../enums';
import {FormsModule} from "@angular/forms";

@Component({
  template: `<input appAddPasswordStrength [(ngModel)]="password">`,
})
class TestComponent {
  password: string = '';
}

describe('PasswordStrengthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let passwordStrengthService: PasswordStrengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        PasswordStrengthDirective,
        StrengthIndicatorComponent,
        TestComponent
      ],
      providers: [
        PasswordStrengthService
      ],
    });
    fixture = TestBed.createComponent(TestComponent);
    passwordStrengthService = TestBed.inject(PasswordStrengthService);
    fixture.detectChanges();
    directiveElement = fixture.debugElement.query(By.directive(PasswordStrengthDirective));
  });

  it('should create the directive', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    expect(directive).toBeTruthy();
  });

  it('should create StrengthIndicatorComponent on ngOnInit', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const strengthIndicatorComponent = directive['componentRef'];
    expect(strengthIndicatorComponent).toBeTruthy();
  });

  it('should update StrengthIndicatorComponent on input', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const strengthIndicatorComponent = directive['componentRef']!.instance;

    spyOn(passwordStrengthService, 'getStatus').and.returnValue(EPasswordStrength.MEDIUM);

    fixture.componentInstance.password = 'MediumPass';
    fixture.detectChanges();

    expect(strengthIndicatorComponent.status).toBe(EPasswordStrength.MEDIUM);
  });

  it('should destroy StrengthIndicatorComponent on ngOnDestroy', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const strengthIndicatorComponent = directive['componentRef'];
    spyOn<any>(strengthIndicatorComponent, 'destroy');

    directive.ngOnDestroy();

    expect(strengthIndicatorComponent?.destroy).toHaveBeenCalled();
  });
});
