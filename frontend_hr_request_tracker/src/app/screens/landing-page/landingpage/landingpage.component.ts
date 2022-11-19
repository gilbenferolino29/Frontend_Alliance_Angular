import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  observer: IntersectionObserver;
  hiddenElemnts:any;
  constructor(
    private router: Router
  ) { 
    this.observer = new IntersectionObserver((entries)=>[
      entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
          entry.target.classList.add('show');
        }
        else{
          entry.target.classList.remove('show');
        }
      })
    ])
  }

  ngOnInit(): void {
    this.hiddenElemnts = document.querySelectorAll('.hidden');
    this.hiddenElemnts.forEach((el:any)=> this.observer.observe(el));
    
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
  


}
