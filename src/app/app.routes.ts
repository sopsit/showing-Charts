
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component'
import { ChartsComponent } from './charts/charts.component';

export const routes: Routes = [
  { path: '',component: LayoutComponent, 
      children: [{path: '', redirectTo: '/login', pathMatch: 'full'}, { path: 'login', component: LoginComponent }] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }
  // { path: 'charts', component: ChartsComponent, canActivate:[authGuard]}
];




