import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthModel } from "../auth.model";

export class ResetPasswordFormModel {
  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      guid: new FormControl('', [])
    })
  }

  is_valid(/* required param here */): boolean {
    // validate from here and  get validation messages
    return this.form.valid
  }

  get_value(): any {
    // return value model
    return {

      confirm_password: this.form.value.password,
      new_password: this.form.value.new_password,
      otp: this.form.value.guid,
    }
  }


  /**
   * Get password error message
   */
  public get password_error(): string | null {
    if (!this.form.controls['password'].touched)
      return null

    if (this.form.controls['password'].getError('required'))
      return 'Password is required'

    return null
  }

  /**
   * Get user name error message
   */
  public get new_password_error(): string | null {
    if (!this.form.controls['new_password'].touched)
      return null

    if (this.form.controls['new_password'].getError('required'))
      return 'Password is required'

    // if (this.form.controls['new_password'].getError('email'))
    //   return 'Username should be a email'

    return null
  }
}