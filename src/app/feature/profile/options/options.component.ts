import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { getErrorMessageHelper, setValidationError } from '../../auth/helper';
import { ContentService } from 'src/app/shared/services/content.service';
import { APIService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  public form: FormGroup;
  public isSuccess = false;

  constructor(
    private content: ContentService,
    private api: APIService,
    private seo: SeoService,
    private fb: FormBuilder
  ) {
    this.seo.set({ title: 'პირადი კაბინეტი' });

    this.form = this.fb.group(
      {
        current: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
      },
      { validators: this.passwordValidator }
    );
  }

  ngOnInit(): void {}

  getErrorMessage(controlName: string): string {
    return getErrorMessageHelper(this.form.get(controlName), this.content);
  }

  passwordValidator(form: FormGroup): null {
    const password = form.get('password');
    const confirm = form.get('password_confirmation');

    if (password.value !== confirm.value) {
      password.setErrors({
        ...password.errors,
        'validation.error': 'validation.confirmed',
      });
    } else {
      if (confirm.valid) {
        password.setErrors(null);
      }
    }

    return null;
  }

  submit(): void {
    if (this.form.valid) {
      this.api.changePassword(this.form.value).subscribe(
        (res) => (this.isSuccess = res.success),
        (res: HttpErrorResponse) => setValidationError(res, this.form)
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
