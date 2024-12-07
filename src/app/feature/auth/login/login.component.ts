import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ContentService } from 'src/app/shared/services/content.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getErrorMessageHelper } from '../helper';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private content: ContentService,
    private auth: AuthService,
    private fb: FormBuilder,
    private seo: SeoService,
  ) {
    this.seo.set({ title: 'ავტორიზაცია' });

    this.form = this.fb.group({
      clientId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.loginValidator });
  }

  ngOnInit(): void {
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessageHelper(this.form.get(controlName), this.content);
  }

  loginValidator(form: FormGroup): null {
    const clientId = form.get('clientId');
    if (clientId.hasError('validation.error')) {
      const errors = clientId.errors;
      delete errors['validation.error'];

      clientId.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  }

  submit(): void {
    if (this.form.valid) {
      this.auth.login(this.form.value)
        .subscribe(() => null, (res: HttpErrorResponse) => {
          if (res.status !== 401) { return; }

          this.form.get('clientId').setErrors({ 'validation.error': 'validation.invalidUser' });
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
