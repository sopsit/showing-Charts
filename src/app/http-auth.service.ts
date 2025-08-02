// src/app/services/http-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {
  private url = `${environment.apiUrl}/auth/login`;
  private chartsUrl  = 'assets/chart-data.json';

  constructor(private http: HttpClient) {}

  post(credentials : User): Observable<any> {
   return this.http.post<any>(this.url, credentials)
  }
  getCharts(): Observable<Highcharts.Options[]> {
    return this.http.get<Highcharts.Options[]>(this.chartsUrl);
  }
  
}
