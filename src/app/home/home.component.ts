

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'home';
}

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { Auth } from './auth.service';

// export const authGuard: CanActivateFn = () => {
//   const authg = inject(Auth);
//   const router = inject(Router)
//   if(!authg.isLogged() || authg.isTokenExpired()) {
//     authg.logout();
//     router.navigate(['/login']);
//     return false
//   }
//   return true
// }



// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// export interface UserName {
//   firstName: string;
//   lastName: string;
// }

// @Injectable({ providedIn: 'root' })
// export class UserService {
//   private userNameSubject = new BehaviorSubject<UserName>({ firstName: 'adas', lastName: 'adasi' });

//   userName$: Observable<UserName> = this.userNameSubject.asObservable();

//   getCurrentUserName(): UserName {
//     return this.userNameSubject.value;
//   }

//   setUserName(firstName: string, lastName: string): void {
//     this.userNameSubject.next({ firstName, lastName });
//   }
// }
// // src/app/services/http-auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './models/user.model';
// import { environment } from '../environment/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpAuthService {
//   private url = `${environment.apiUrl}/auth/login`;
//   private chartsUrl  = 'assets/chart-data.json';

//   constructor(private http: HttpClient) {}

//   post(credentials : User): Observable<any> {
//    return this.http.post<any>(this.url, credentials)
//   }
//   getCharts(): Observable<Highcharts.Options[]> {
//     return this.http.get<Highcharts.Options[]>(this.chartsUrl);
//   }
  
// }

// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {} from './login/login.component'
// import { User } from './models/user.model';
// import { HttpAuthService } from './http-auth.service';

// @Injectable({ providedIn: 'root' })

// export class Auth {
  
//   private decodeToken(token: string): any {
//     try {
//       const payload = token.split('.')[1];
//       const decoded = atob(payload);
//       return JSON.parse(decoded);
//     } catch (e) {
//       return null;
//     }
//   }
//   constructor(private http: HttpAuthService) { }
//   login(credentials: User): Observable<any> {
//     return this.http.post(credentials)
//   }
//   setToken(token: string) {
//     localStorage.setItem('token', token);
//   }
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
//   isLogged(): boolean {
//     return !!this.getToken();
//   }
//   logout() {
//     localStorage.removeItem('token')
//   }

  
//   generateFakeToken(userData: User) : string {
//     const base64UrlEncode = (obj: any) =>
//       btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

//     const header = {
//       alg: 'HS256',
//       typ: 'JWT'
//     };

//     const payload = {
//       username: userData.username,
//       fname: userData.firstName,
//       lname : userData.lastName,
//       exp: Math.floor(Date.now() / 1000) + 60 * 15// 15 min
//     };

//     return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.fake-signature`;
//   }

//   loginWithFakeJson(userData:User): void {
//     const token = this.generateFakeToken(userData);
//     this.setToken(token);
//   }


//   isTokenExpired(): boolean {
//     const token = this.getToken();
//     if (!token) return true;
  
//     const decoded = this.decodeToken(token);
//     if (!decoded || !decoded.exp) return true;
  
//     const currentTime = Math.floor(Date.now() / 1000);
//     return decoded.exp < currentTime;
//   } 

// }

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideHttpClient()]
// };
// import * as Highcharts from 'highcharts';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ChartsComponent],
//   templateUrl: './home.component.html'
// })
// export class HomeComponent {
//   userName: UserName = { firstName: '', lastName: '' };
//   charts: Highcharts.Options[] =  [];
//   originalCharts: Highcharts.Options[] = [];

  
//   constructor(private userService: UserService, private http: HttpAuthService) {
//     this.userService.userName$.subscribe(data => {
//       this.userName = data;
//     });
//     this.loadCharts();
//   }
  
//   onNameChange() {
//     this.userService.setUserName(this.userName.firstName, this.userName.lastName);
//   }

//   loadCharts() {
//     this.http.getCharts().subscribe(data => {
//       this.originalCharts = JSON.parse(JSON.stringify(data));
//       this.charts = JSON.parse(JSON.stringify(data));
//     });
//   }
 
// }
 