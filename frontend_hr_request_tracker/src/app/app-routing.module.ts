import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './screens/admin-screens/home-ticket-admin/admin-home/admin-home.component';
import { CreateTicketComponent } from './screens/create-ticket/create-ticket.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { LoginComponent } from './screens/login/login/login.component';
import { HomeRoleComponent } from './screens/roles/home-role/home-role.component';
import { HomeTrackerComponent } from './screens/tracker/home-tracker/home-tracker.component';
import { UserHomeComponent } from './screens/user-screens/home-ticket-user/user-home/user-home.component';
import { HomeUserComponent } from './screens/users/home-user/home-user.component';
import { ViewticketComponent } from './screens/viewticket/viewticket.component';
import { AuthGuard } from './shared/auth.guard';

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
    path: 'createticket',
    component: CreateTicketComponent
  },
  {
    path: 'tickets',
    component: UserHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewticket',
    component: ViewticketComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'trackers',
    component: HomeTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    },
  },
  {
    path: 'users',
    component: HomeUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    },
  },
  {
    path: 'roles',
    component: HomeRoleComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    },
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
