import { AbstractControl } from "@angular/forms";

export function passwordConfirmValidator(control: AbstractControl): { [key: string]: any | null } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.pristine || confirmPassword.pristine) {
    return null;
  }

  return password && confirmPassword && password.value === confirmPassword.value ? null : { 'misMatch': true };

}
