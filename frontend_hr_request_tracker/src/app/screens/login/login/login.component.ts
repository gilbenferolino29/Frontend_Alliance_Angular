import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  loginAttempt: boolean = false;
  loginFailed: boolean = false;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('resetPassword', 'false');
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  get f() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  login() {
    if(this.form.valid) {
      this.loginAttempt = true;
      let formData: FormData = new FormData();

      formData.append('username', this.f.email.value != null ? this.f.email.value.toString() : '');
      formData.append('password', this.f.password.value != null ? this.f.password.value.toString() : '');
      
      this.authService.login(formData).pipe(
        mergeMap((res1: any) => {
          if(res1.status === "SUCCESS") {
            let tokenData: FormData = new FormData();
            var userID = res1.data.userID;
            var userRole = res1.data.userRole.roleAbbv;
            var username = res1.data.username;
            var authToken = uuid.v4();
  
            tokenData.append('user', userID.toString());
            tokenData.append('authToken', authToken.toString());

            localStorage.setItem('user', userID);
            localStorage.setItem('role', userRole);
            localStorage.setItem('username', username);
            
            return this.authService.generateToken(tokenData);
          }

          this.loginFailed = true;
          throw('User not found.');
        })
        ).subscribe((res: any) => {
          if(res.status === "SUCCESS") {
            this.router.navigate(['dashboard']).then(() => {
              window.location.reload();
            });
          }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
