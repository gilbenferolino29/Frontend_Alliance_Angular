import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTicketComponent } from './screens/create-ticket/create-ticket.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { LoginComponent } from './screens/login/login/login.component';
import { UserHomeComponent } from './screens/user-screens/home-ticket-user/user-home/user-home.component';
import { ViewticketComponent } from './screens/viewticket/viewticket.component';

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
  },
  {
    path: 'ticketlist',
    component: UserHomeComponent
  },
  {
    path: 'viewticket',
    component: ViewticketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
