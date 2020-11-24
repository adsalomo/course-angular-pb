import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('home');
    }
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  private createForm() {
    this.form = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

  signIn() {
    if (this.form.invalid) {
      return Object.values(this.form.controls)
        .forEach(c => {
          console.log(c.value);
          c.markAsTouched();
        });
    }

    console.log(this.form.value);

    this.authService.login(this.form.value)
      .subscribe((resp) => {
        console.log(resp);
        localStorage.setItem('token', resp['idToken']);
        this.router.navigateByUrl('home');
      }, (error) => {
        console.log(error);
      });
  }

}
