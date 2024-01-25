import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from "rxjs";

import { StrengthIndicatorComponent } from './strength-indicator.component';
import { EPasswordStrength } from "../../../shared/enums";

describe('StrengthIndicatorComponent', () => {
  let component: StrengthIndicatorComponent;
  let fixture: ComponentFixture<StrengthIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrengthIndicatorComponent);
    component = fixture.componentInstance;
    component['colorsSub'] = jasmine.createSpyObj({ unsubscribe: null });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set colors based on status on ngOnInit', () => {
    const status: EPasswordStrength = EPasswordStrength.EASY;
    component.status = status;

    component.ngOnInit();

    expect(component.colors).toEqual(['red', 'grey', 'grey']);
  });

  it('should update colors when status changes on ngOnChanges', () => {
    const newStatus: EPasswordStrength = EPasswordStrength.MEDIUM;

    component.ngOnChanges({
      status: {
        currentValue: newStatus,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.colors).toEqual(['yellow', 'yellow', 'grey']);
  });

  it('should subscribe to colorsSubject and update colors on status change', () => {
    const newStatus: EPasswordStrength = EPasswordStrength.STRONG;

    component.ngOnInit();
    component.status = newStatus;

    component.ngOnChanges({
      status: {
        currentValue: newStatus,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.colors).toEqual(['green', 'green', 'green']);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component['colorsSub'] = new Subscription();
    const unsubscribeSpy = spyOn<any>(component['colorsSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
