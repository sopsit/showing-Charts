

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-home-shell',
  standalone: true,
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
 
  @ViewChild('homeFrame') iframeRef!: ElementRef;

  ngAfterViewInit() {
    const userData = {
      fname: 'Yasaman',
      lname: 'Sadeghi',
      type: 'USER_DATA' 
    };

    setTimeout(() => {
      this.iframeRef.nativeElement.contentWindow.postMessage(userData, 'http://localhost:45613');
    }, 1000);
  }
}
  



