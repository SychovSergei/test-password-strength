import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {IRequestData} from "../../models/password-form.interface";


@Component({
  selector: 'app-password-td-form',
  templateUrl: './password-td-form.component.html',
  styleUrls: ['./password-td-form.component.scss']
})
export class PasswordTdFormComponent {

  @ViewChild('passwordForm') form!: NgForm;

  public model: IRequestData;
  public passValue: string = '';

  constructor() {
    this.model = { password: '' };
  }

  onInputPasswordChange(value: string) {
    this.passValue = value;
  }

  submit() {
    if (this.form.valid) {
      const finalData: IRequestData = {
        password: this.form.controls['password'].value,
      }
    }
  }

}
