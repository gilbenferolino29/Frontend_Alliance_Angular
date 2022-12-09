import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  submit() {
    if(this.form.valid) {
      let email = this.f.email.value?.toString();

      this.authService.forgotPassword(email).subscribe((res: any) => {
        if(res !== null) {
        } else {
          throw('Email not found.');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
