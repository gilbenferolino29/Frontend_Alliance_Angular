import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) : boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  userID: any;

  loginAttempt = false;
  loginFailed = false;

  form = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['']
  }, { validators: this.checkPasswords });

  matcher = new PasswordStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.paramMap.get('id');
  }

  get f() {
    return this.form.controls;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  changePassword() {
    if(this.form.valid) {
      this.loginAttempt = true;
      let formData: FormData = new FormData();

      formData.append('password', this.f.password.value != null ? this.f.password.value.toString() : '');

      this.authService.resetPassword(this.userID.toString(), formData).subscribe((res: any) => {
        if(res.data == 1) {
          this.openSnackbar('Password successfully changed.', 'Dismiss');
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1000)
        } else {
          throw('Error changing password.');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  openSnackbar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 3000
    });
  }
}
