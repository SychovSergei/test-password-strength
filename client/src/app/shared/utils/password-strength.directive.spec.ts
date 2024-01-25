import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PasswordStrengthDirective } from './password-strength.directive';
import { PasswordStrengthService } from '../services/password-strength.service';

@Component({
  template: '<input appAddPasswordStrength [(ngModel)]="password">',
})
class TestComponent {
  password: string = '';
}

describe('PasswordStrengthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        PasswordStrengthDirective,
        TestComponent
      ],
      providers: [
        PasswordStrengthService
      ],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(PasswordStrengthDirective));
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    expect(directive).toBeTruthy();
  });

  it('should create StrengthIndicatorComponent on ngOnInit', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const strengthIndicatorComponent = directive['componentRef']?.instance;
    expect(strengthIndicatorComponent).toBeTruthy();
  });

  it('should update StrengthIndicatorComponent on input', fakeAsync(() => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const updateStrengthIndicatorSpy = spyOn<any>(directive, 'updateStrengthIndicator').and.callThrough();

    directiveElement.triggerEventHandler('input', { target: { value: 'password123' } });

    tick();
    fixture.detectChanges();

    expect(updateStrengthIndicatorSpy).toHaveBeenCalled();
  }));

  it('should destroy StrengthIndicatorComponent on ngOnDestroy', () => {
    const directive = directiveElement.injector.get(PasswordStrengthDirective);
    const destroySpy = spyOn<any>(directive['componentRef'], 'destroy').and.callThrough();

    directive.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
  });
});
