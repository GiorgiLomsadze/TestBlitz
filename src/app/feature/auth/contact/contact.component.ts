import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContentService } from 'src/app/shared/services/content.service';
import { APIService } from 'src/app/shared/services/api.service';
import { getErrorMessageHelper } from '../helper';
import { Options } from 'src/app/shared/interfaces/init.interface';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public form: FormGroup;
  public isSuccess = false;
  public options: Options;

  constructor(
    private content: ContentService,
    private api: APIService,
    private fb: FormBuilder,
    private seo: SeoService,
  ) {
    this.options = this.api.initData.options;
    this.seo.set({ title: 'კონტაქტი' });

    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^5(?:\s?\d){8}$/)]],
    });
  }

  ngOnInit(): void {
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessageHelper(this.form.get(controlName), this.content);
  }

  submit(): void {
    if (this.form.valid) {
      this.api.callMe({ phone: this.form.value.phone.replace(/\s+/g, '') })
        .subscribe(res => this.isSuccess = res.success);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
