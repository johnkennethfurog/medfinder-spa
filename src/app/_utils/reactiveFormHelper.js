import { FormGroup, FormControl, FormArray } from "@angular/forms";
export const Validate = formGroup => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      control.controls.map(ctrl => {
        Validate(ctrl);
      });
    }
  });
};
