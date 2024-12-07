import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

import { APIService } from 'src/app/shared/services/api.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { getErrorMessageHelper, setValidationError } from '../helper';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('timer', [
      state('empty', style({ left: '-100%' })),
      state('full', style({ left: '0%' })),
      transition('empty => full', animate('60s')),
      transition('full => empty', animate('0s')),
    ])
  ]
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public state: 'empty' | 'full' = 'full';

  public isSuccess = false;
  public isResendDisabled = false;
  private sendSmsAction = 2;

  constructor(
    private content: ContentService,
    private api: APIService,
    private seo: SeoService,
    private fb: FormBuilder,
  ) {
    this.seo.set({ title: 'რეგისტრაცია' });

    this.form = this.fb.group({
      id: [null, Validators.required],
      clientId: ['', Validators.required],
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordValidator });
  }

  ngOnInit(): void {
  }

  getCode(): void {
    const control = this.form.get('clientId');

    if (control.valid) {
      this.api.getCode({ clientId: control.value, action: this.sendSmsAction})
        .subscribe(res => {
          if (res.success) {
            this.setTimer();
            this.form.get('id').setValue(res.data.smsId);
          } else {
            control.setErrors({ errorCode: res.errorCode });
          }
        }, (res: HttpErrorResponse) => setValidationError(res, this.form));
    } else {
      control.markAsTouched();
    }

  }

  passwordValidator(form: FormGroup): null {
    const password = form.get('password');
    const confirm = form.get('password_confirmation');

    if (password.value !== confirm.value) {
      password.setErrors({ ...password.errors, 'validation.error': 'validation.confirmed' });
    } else {
      if (confirm.valid) {
        password.setErrors(null);
      }
    }

    return null;
  }

  animateDone(event: AnimationEvent): void {
    if (event.toState === 'empty') {
      this.state = 'full';
    }
    if (event.toState === 'full') {
      this.isResendDisabled = false;
    }
  }

  setTimer(): void {
    this.state = 'empty';
    this.isResendDisabled = true;
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessageHelper(this.form.get(controlName), this.content);
  }

  submit(): void {
    if (this.form.valid) {
      this.api.register(this.form.value)
        .subscribe(
          (res) => this.isSuccess = res.success,
          (res: HttpErrorResponse) => setValidationError(res, this.form)
        );
    } else {
      const idControl = this.form.get('id');
      if (!idControl.valid) {
        this.form.get('code').setErrors({ code: true });
      }
      this.form.markAllAsTouched();
    }
  }

}
