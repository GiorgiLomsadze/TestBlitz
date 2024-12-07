import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { APIService } from 'src/app/shared/services/api.service';
import { FooterMenu, Options } from 'src/app/shared/interfaces/init.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public footerMenu: FooterMenu;
  public options: Options;
  public email: FormControl;
  public isSuccess = false;

  constructor(
    private api: APIService,
  ) {
    this.footerMenu = this.api.initData.footerMenu;
    this.options = this.api.initData.options;

    this.email = new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email]
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    const email = this.email;
    if (email.valid) {
      this.api.subscribe({ email: email.value })
        .subscribe(res => this.isSuccess = res.success);
    } else {
      email.markAsTouched();
    }
  }

}
