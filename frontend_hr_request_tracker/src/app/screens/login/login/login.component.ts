import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';

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
  
      this.queryService.login(formData).subscribe((res: any) => {
        if(res.status === "SUCCESS") {
          // ROUTE HERE OR ENABLE AUTHGUARD
          this.router.navigate(['tickets']);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
