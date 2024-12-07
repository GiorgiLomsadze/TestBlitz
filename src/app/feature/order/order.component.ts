import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { getErrorMessageHelper, setValidationError } from '../auth/helper';
import { ContentService } from 'src/app/shared/services/content.service';
import { APIService } from 'src/app/shared/services/api.service';
import { ProductType } from 'src/app/shared/interfaces/models.interface';
import { SeoService } from 'src/app/shared/services/seo.service';
import { Response } from 'src/app/shared/interfaces/response.interface';

enum OrderSteps {
  Code = 'code',
  Success = 'success',
  Failure = 'failure',
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public step: OrderSteps = null;
  public error: string;

  private ob: Subscription;
  private step$: Subscription;

  constructor(
    private content: ContentService,
    private api: APIService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private location: LocationStrategy,
    private router: Router,
    private seo: SeoService
  ) {
    this.seo.set({ title: 'ონლაინ შეკვეთა' });

    this.form = this.fb.group({
      base: this.fb.group({
        id: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        personalNumber: [
          null,
          [Validators.required, Validators.pattern(/^(?:\d){11}$/)],
        ],
        phoneNumber: [
          null,
          [Validators.required, Validators.pattern(/^5(?:\s?\d){8}$/)],
        ],
      }),
      confirm: this.fb.group({
        id: [null, Validators.required],
        code: [null, [Validators.required, Validators.minLength(4)]],
      }),
    });

    this.step$ = this.activeRoute.queryParamMap.subscribe((params) => {
      this.step = params.get('step') as OrderSteps;
      const id = this.form.get('confirm.id');
      if (!id.valid && this.step === OrderSteps.Code) {
        this.router.navigate([], { queryParams: { step: null } });
      }
    });
  }

  ngOnInit(): void {
    this.ob = this.activeRoute.paramMap.subscribe((params) => {
      this.form.get('base').patchValue({
        id: params.get('id'),
      });
      if (!params.get('slug') || !ProductType[params.get('slug')]) {
        this.router.navigate(['404'], { skipLocationChange: true });
      }
    });
  }

  get isFormStep(): boolean {
    return new Set([null, 'code']).has(this.step);
  }

  getErrorMessage(controlName: string): string {
    return getErrorMessageHelper(this.form.get(controlName), this.content);
  }

  back(): void {
    this.location.back();
  }

  next(): void {
    if (this.step === null) {
      this.stepOne();
    } else if (this.step === OrderSteps.Code) {
      this.stepTwo();
    }
  }

  private stepOne(): void {
    const form = this.form.get('base') as FormGroup;
    if (form.valid) {
      const body = this.form.get('base').value;
      body.id = +body.id;
      body.phoneNumber = +body.phoneNumber.replace(/\s+/g, '');
      this.api.order(body).subscribe(
        (res) => {
          if (!res.success) {
            this.checkErrors(res);

            return;
          }
          this.form.get('confirm.id').patchValue(res.data);
          this.router.navigate([], { queryParams: { step: OrderSteps.Code } });
        },
        (res: HttpErrorResponse) => {
          this.checkProduct(res.error.errors);
          setValidationError(res, form);
        }
      );
    } else {
      form.markAllAsTouched();
    }
  }

  private stepTwo(): void {
    const form = this.form.get('confirm') as FormGroup;
    if (form.valid) {
      this.api.confirmOrder(form.value).subscribe(
        (res) => {
          if (!res.success) {
            return;
          }
          this.router.navigate([], {
            queryParams: { step: OrderSteps.Success },
          });
          this.form.reset();
        },
        (res: HttpErrorResponse) => setValidationError(res, form)
      );
    } else {
      form.markAllAsTouched();
    }
  }

  private checkErrors(res: Response<number>): void {
    this.error = 'გთხოვთ სცადოთ მოგვიანებით';
    this.router.navigate([], { queryParams: { step: OrderSteps.Failure } });
  }

  private checkProduct(errors: any): void {
    if (!errors.id) {
      return;
    }
    this.error = 'მსგავსი პაკეტი არ არსებობოს';
    this.router.navigate([], { queryParams: { step: OrderSteps.Failure } });
  }

  ngOnDestroy(): void {
    this.ob.unsubscribe();
    this.step$.unsubscribe();
  }
}
