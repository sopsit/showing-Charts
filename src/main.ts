
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/home/home.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(HomeComponent, {
  providers: [provideHttpClient()]
});
