import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTicketComponent } from './screens/create-ticket/create-ticket.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { LoginComponent } from './screens/login/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingpageComponent
  },
   {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'new',
    component: CreateTicketComponent
  }
];

  },
  {
    path:'home',
    component: UserHomeComponent, 
  },
  {
    path:'admin',
    component: AdminHomeComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
