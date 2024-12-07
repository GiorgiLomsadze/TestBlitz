import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {trigger, state, style, transition, animate, AnimationEvent} from '@angular/animations';

import {APIService} from 'src/app/shared/services/api.service';
import {ContentService} from 'src/app/shared/services/content.service';
import {getErrorMessageHelper, setValidationError} from '../auth/helper';
import {SeoService} from 'src/app/shared/services/seo.service';
import {environment} from '../../../environments/environment';
import {Document} from '../../shared/interfaces/models.interface';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  animations: [
    trigger('timer', [
      state('empty', style({left: '-100%'})),
      state('full', style({left: '0%'})),
      transition('empty => full', animate('60s')),
      transition('full => empty', animate('0s')),
    ])
  ]
})
export class ContractsComponent implements OnInit {
  private activeRoute$: Subscription;

  public form: FormGroup;
  public state: 'empty' | 'full' = 'full';

  public isSuccess = false;
  public isResendDisabled = false;
  public findSubscriber = true;
  public storage = environment.storage + 'documents/';
  public title = '';
  public documents: Document[] = [];
  public url = environment.api;
  public timeStamp;
  public smsId;
  public smsNumber;
  private sendSmsAction = 0;

  private showErrorClientId = false;
  private errorMessageClientId = 'კონტრაქტი უკვე დადასტურებულია, ან წარმოიშვა სხვა ტექნიკური პრობლემა, გთხოვთ მიმართოთ ბილინგს!';

  private showErrorCaptha = false;
  private errorMessageCaptha = 'სურათზე ნაჩვენები კოდი არ ემთხვევა შეყვანილს';

  constructor(
    private content: ContentService,
    private api: APIService,
    private seo: SeoService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
  ) {
    this.seo.set({title: 'კონტრაქტის დამტკიცებისათვის'});

    this.form = this.fb.group({
      id: [null, Validators.required],
      clientId: ['', Validators.required],
      receivedCode: ['', Validators.required],
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      captchaCode: ['', Validators.required],
    }, {validators: this.passwordValidator});

    this.activeRoute$ = this.activeRoute.paramMap
      .pipe(switchMap(e => this.api.getDocuments('physical', null)))
      .subscribe(res => {
        this.documents = res.data.documents;
        this.title = res.data.title;
        this.seo.set({title: this.title});
      });
  }

  ngOnInit(): void {
  }

  passwordValidator(form: FormGroup): null {
    const password = form.get('password');
    const confirm = form.get('password_confirmation');

    if (password.value !== confirm.value) {
      password.setErrors({...password.errors, 'validation.error': 'validation.confirmed'});
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

  findSubscriberClick(): void {
    this.showErrorClientId = false;
    this.showErrorCaptha = false;
    const captchaCode = this.form.get('captchaCode');
    const clientId = this.form.get('clientId');
    this.api.checkCaptchaSubscr({code: captchaCode.value, client: clientId.value})
      .subscribe(res1 => {

        if (res1.success) {
          const mapped = Object.keys(res1.data).map(key => (res1.data[key]));
          this.api.getDocuments('physical', mapped)
            .subscribe(res2 => {

              this.api.getCode({clientId: clientId.value, action: this.sendSmsAction})
                .subscribe(res3 => {

                  if (res3.success) {
                    this.smsId = res3.data.smsId;
                    this.documents = res2.data.documents;
                    this.smsNumber = res3.data.phone;
                    this.findSubscriber = false;
                  }

                }, (res: HttpErrorResponse) => {
                  // @ts-ignore
                  clientId.setErrors('validation.error');
                  this.showErrorClientId = true;
                });

            });
        } else {
          if (res1.errorCode === 1) {
            // @ts-ignore
            clientId.setErrors('validation.error');
            this.showErrorClientId = true;
          } else if (res1.errorCode === 2) {
            // @ts-ignore
            captchaCode.setErrors('validation.error');
            this.showErrorCaptha = true;
          }
        }

      });
  }

  submitCode()
    :
    void {
    const receivedCode = this.form.get('receivedCode');
    const clientId = this.form.get('clientId');
    if (receivedCode.valid) {
      this.api.checkSmsCode({smsId: this.smsId, smsCode: receivedCode.value, clientId: clientId.value}).subscribe(
        (res) => {
          if (res.success) {
            this.isSuccess = true;
          } else {
            // @ts-ignore
            receivedCode.setErrors('validation.error');
          }
        }
      );
    } else {
      receivedCode.markAsTouched();
    }
  }

  cantSeeCode()
    :
    void {
    this.timeStamp = (new Date()).getTime();
  }


  getLinkPicture()
    :
    string {
    if (this.timeStamp) {
      return this.url + 'my-captcha?' + this.timeStamp;
    }
    return this.url + 'my-captcha';
  }

}
