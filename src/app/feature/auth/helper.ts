import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export const getErrorMessageHelper = (control: AbstractControl, content: any): string => {
    if (control.invalid) {
        if (control.hasError('required')) {
            return 'ველი სავალდებულოა';
        }
        if (control.hasError('minlength')) {
            return 'მინიმუმ ' + control.getError('minlength').requiredLength + ' სიმბოლო';
        }
        if (control.hasError('pattern')) {
            return 'ფორმატი არასწორია';
        }
        if (control.hasError('code')) {
            return 'კოდი არასწორია';
        }
        if (control.hasError('validation.error')) {
            return content.data.errorValidation[control.getError('validation.error')];
        }
        if (control.hasError('errorCode')) {
            return content.data.errorCode[control.getError('errorCode')];
        }
    }

    return '';
};

export const setValidationError = (res: HttpErrorResponse, form: FormGroup): void => {
    if (res.status !== 422) { return; }

    const errors = res.error.errors;

    Object.keys(errors).forEach(key => {
        form.get(key).setErrors({ 'validation.error': errors[key][0] });
    });
};
