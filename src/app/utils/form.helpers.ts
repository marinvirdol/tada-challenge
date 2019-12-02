import { FormGroup } from '@angular/forms';

export const isFieldInvalid = (formGroup: FormGroup, field: string): boolean => {
  return formGroup.get(field).invalid && formGroup.get(field).touched;
};

export const hasError = (formGroup: FormGroup, field: string, error: string): boolean => {
  return formGroup.get(field).hasError(error);
};
