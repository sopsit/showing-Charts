

import { Component } from '@angular/core';
import { UserName, UserService } from '../user.service';
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
  userName: UserName = { firstName: '', lastName: '' };
  charts: Highcharts.Options[] =  [];
  originalCharts: Highcharts.Options[] = [];

  
  constructor(private userService: UserService, private http: HttpAuthService) {
    this.userService.userName$.subscribe(data => {
      this.userName = data;
    });
    this.loadCharts();
  }
  
  onNameChange() {
    this.userService.setUserName(this.userName.firstName, this.userName.lastName);
  }

  loadCharts() {
    this.http.getCharts().subscribe(data => {
      this.originalCharts = JSON.parse(JSON.stringify(data));
      this.charts = JSON.parse(JSON.stringify(data));
    });
  }
 
}
  

// ngOnChanges() {
//   console.log('ngOnChanges')

// }
// ngOnInit() {
//   console.log('ngOnInit')

// }
// ngDoCheck() {
//   console.log('ngDoCheck')

// }
// ngAfterContentInit() {
//   console.log('ngAfterContentInit')

// }
// ngAfterContentChecked() {
//   console.log('ngAfterContentChecked')

// }
// ngAfterViewInit() {
//   console.log('ngAfterViewInit')

// }
// ngAfterViewChecked() {
//   console.log('ngAfterViewChecked')

// }
// ngOnDestroy() {
//   console.log('ngOnDestroy')
// }


