

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'login-01';
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      if (this.auth.isTokenExpired()) {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    }, 1000); // 1 seconds
  }
}
