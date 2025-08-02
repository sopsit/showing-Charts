

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm : FormGroup;
  
  constructor(private auth: Auth, private router: Router, private f: FormBuilder) {
    this.loginForm = this.f.group ({
      username :['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(4)]],
      email : ['']
    })
  }
  login() {
    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
  
    this.auth.login(credentials).subscribe({
      next: (res) => {
        const user: User = {
          username: res.username,
          password :res.password,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email
        };
        this.auth.loginWithFakeJson(user)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Login failed. Check username and password.');
        // console.error(err);
      }
    });
  } 
}
  
 