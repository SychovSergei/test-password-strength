import { ComponentRef, Directive, ElementRef, HostListener, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";

import { EPasswordStrength} from "../enums";
import { StrengthIndicatorComponent} from "../../common/components/strength-indicator/strength-indicator.component";
import { PasswordStrengthService } from "../services/password-strength.service";

@Directive({
  selector: '[appAddPasswordStrength]'
})
export class PasswordStrengthDirective implements OnInit, OnDestroy {

  status: EPasswordStrength = EPasswordStrength.EMPTY;
  private componentRef: ComponentRef<StrengthIndicatorComponent> | null = null;

  constructor(private el: ElementRef,
              public viewContainerRef: ViewContainerRef,
              private passwordStrengthService: PasswordStrengthService,
              ) {}

  ngOnInit() {
    this.createStrengthIndicatorComponent();
  }

  private createStrengthIndicatorComponent() {
    this.componentRef = this.viewContainerRef.createComponent(StrengthIndicatorComponent);
    this.componentRef.instance.status =  this.passwordStrengthService.getStatus(this.el.nativeElement.value);
  }

  private updateStrengthIndicator() {
    if (this.componentRef) {
      this.componentRef.setInput(
        'status',
        this.passwordStrengthService.getStatus(this.el.nativeElement.value)
      );
    }
  }

  @HostListener('input') onInput() {
    this.updateStrengthIndicator();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}

