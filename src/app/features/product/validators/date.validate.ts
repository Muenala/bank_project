import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static minDate(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value)
        return null;
      const inputDate = new Date(control.value).setHours(0, 0, 0, 0);
      const compareDate = new Date(minDate.setDate(minDate.getDate() - 1)).setHours(0, 0, 0, 0);
      return inputDate < compareDate ? { "minDate": true } : null;
    };
  }
}