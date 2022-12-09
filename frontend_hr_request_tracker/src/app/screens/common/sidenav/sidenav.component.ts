import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  navLinks = ['Dashboard', 'Tickets', 'Aging Tickets', 'Users', 'Trackers', 'Roles'];
  @ViewChild('drawer') sidenav!: MatSidenav;

  username = localStorage.getItem('username');
  role = localStorage.getItem('role');

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    if(this.role != 'ADMIN') {
      this.navLinks.splice(2, 4);
    }
  }

  ngAfterViewInit() {
    this.checkAuthenticated();
  }
  
  logout() {
    localStorage.clear();
    window.location.reload();
  }

  clickNav(event: any) {
    var destination = event.target.innerText.split(" ");
    this.router.navigate([destination[0].toLowerCase()]);
  }

  checkAuthenticated() {
    if(!localStorage.getItem('user')) {
      this.sidenav.toggle();
    }
  }

}
