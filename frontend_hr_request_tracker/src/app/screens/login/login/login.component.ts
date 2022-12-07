import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';
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
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private queryService: QueryService,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
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
      let formData: FormData = new FormData();

      formData.append('username', this.f.email.value != null ? this.f.email.value.toString() : '');
      formData.append('password', this.f.password.value != null ? this.f.password.value.toString() : '');
      

      this.queryService.login(formData).pipe(
        mergeMap((res1: any) => {
          if(res1.status === "SUCCESS") {
            let tokenData: FormData = new FormData();
            var userID = res1.data.userID;
            var authToken = uuid.v4();
  
            tokenData.append('user', userID.toString());
            tokenData.append('authToken', authToken.toString());

            localStorage.setItem('user', userID);
            
            return this.queryService.generateToken(tokenData);
          }

          throw('User not found.');
        })
        ).subscribe((res: any) => {
          if(res.status === "SUCCESS") {
            this.router.navigate(['tickets']);
          }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
