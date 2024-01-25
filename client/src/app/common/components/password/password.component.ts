import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { strengthPasswordValidatorReactive } from "./strength-password-validator-reactive.directive";
import { EPasswordStrength } from "../../../shared/enums";
import { IRequestData } from "../../models/password-form.interface";
import { PasswordStrengthService } from "../../../shared/services/password-strength.service";


@Component({
  selector: 'app-input-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {

  passwordForm: FormGroup;
  passwordStatus: EPasswordStrength = EPasswordStrength.EMPTY;
  private finalData: IRequestData = { password: '' };

  private passSub!: Subscription;

  constructor(private passwordStrengthService: PasswordStrengthService) {

    this.passwordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        strengthPasswordValidatorReactive()
      ])
    });

  }

  ngOnInit() {
    this.passSub = this.passwordForm.controls['password'].valueChanges
      .subscribe((value) => {
        this.passwordStatus = this.passwordStrengthService.getStatus(value);
      });
  }

  ngOnDestroy() {
    this.passSub?.unsubscribe();
  }

  submit() {
    if (this.passwordForm.valid) {
      this.finalData.password = this.passwordForm.controls['password'].value
    }
  }

}
