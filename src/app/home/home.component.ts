
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from '../charts/charts.component';
import * as Highcharts from 'highcharts';
import { HttpAuthService } from '../http-auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  charts: Highcharts.Options[] =  [];
  originalCharts: Highcharts.Options[] = [];

  
  constructor( private http: HttpAuthService) {
    // console.log('yeah')
    this.loadCharts() 
  }
  

  loadCharts() {
    this.http.getCharts().subscribe(data => {
      this.originalCharts = JSON.parse(JSON.stringify(data));
      this.charts = JSON.parse(JSON.stringify(data));
      console.log('charts')
    });
  }
  firstName = '';
  lastName = '';

  ngOnInit() {
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4200') return;
      this.loadCharts();
      const data = event.data;
      if (data.type === 'USER_DATA') {
        this.firstName = data.fname;
        this.lastName = data.lname;
      }
    });

  }
}


  



