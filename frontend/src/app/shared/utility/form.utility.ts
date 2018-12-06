import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class FormUtility {
  constructor() { }

  validateAllFormFields(formGroup: FormGroup): void {
    if (!formGroup) return;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control.invalid && control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control.invalid && control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getFrmCtrlByName(frm: FormGroup, name: string): AbstractControl {
    return frm.controls[name];
  }
}
