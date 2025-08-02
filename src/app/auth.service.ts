


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {} from './login/login.component'
import { User } from './models/user.model';
import { HttpAuthService } from './http-auth.service';

@Injectable({ providedIn: 'root' })

export class Auth {
  
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }
  constructor(private http: HttpAuthService) { }
  login(credentials: User): Observable<any> {
    return this.http.post(credentials)
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLogged(): boolean {
    return !!this.getToken();
  }
  logout() {
    localStorage.removeItem('token')
  }

  
  generateFakeToken(userData: User) : string {
    const base64UrlEncode = (obj: any) =>
      btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      username: userData.username,
      fname: userData.firstName,
      lname : userData.lastName,
      exp: Math.floor(Date.now() / 1000) + 60 * 15// 15 min
    };

    return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.fake-signature`;
  }

  loginWithFakeJson(userData:User): void {
    const token = this.generateFakeToken(userData);
    this.setToken(token);
  }


  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
  
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
  
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } 

}

//token + pipe + layout(child) + formGroup with validation
//new page -> shared service (fname, lname) -> get from token // behaviorsubject in service / subject / lifecycle + life time / sub and unsub
//service for send req base http service
// solid / single responsibility / seperation of concern