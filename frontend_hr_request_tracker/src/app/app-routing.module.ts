import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAgingTicketsComponent } from './screens/dashboard/all-aging-tickets/all-aging-tickets.component';
import { DashboardHomeComponent } from './screens/dashboard/dashboard-home/dashboard-home.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { ForgotPasswordComponent } from './screens/login/forgot-password/forgot-password.component';
import { LoginComponent } from './screens/login/login/login.component';
import { ResetPasswordComponent } from './screens/login/reset-password/reset-password.component';
import { HomeRoleComponent } from './screens/roles/home-role/home-role.component';
import { HomeTrackerComponent } from './screens/tracker/home-tracker/home-tracker.component';
import { UserHomeComponent } from './screens/user-screens/home-ticket-user/user-home/user-home.component';
import { ReportAgingComponent } from './screens/user-screens/report-aging/report-aging.component';
import { ReportCategoryCountComponent } from './screens/user-screens/report-category-count/report-category-count.component';
import { ReportUserCountComponent } from './screens/user-screens/report-user-count/report-user-count.component';
import { HomeUserComponent } from './screens/users/home-user/home-user.component';
import { AuthGuard } from './shared/auth.guard';
import { ResetPasswordGuard } from './shared/reset-password.guard';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuard]
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aging',
    component: AllAgingTicketsComponent,
    canActivate: [AuthGuard],
    data: {
     role: 'ADMIN' 
    }
  },
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'tickets',
    component: UserHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports/aging',
    component: ReportAgingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports/user-count',
    component: ReportUserCountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports/category-count',
    component: ReportCategoryCountComponent,
    canActivate: [AuthGuard]
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
