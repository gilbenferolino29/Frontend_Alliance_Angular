import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend_hr_request_tracker';
  
  logout() {
    localStorage.clear();
    window.location.reload();
  }

  isAuthenticated() {
    if(localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
