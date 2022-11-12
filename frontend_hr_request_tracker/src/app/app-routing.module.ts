import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './screens/admin-screens/home-ticket-admin/admin-home/admin-home.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { UserHomeComponent } from './screens/user-screens/home-ticket-user/user-home/user-home.component';

const routes: Routes = [
  {
    path:'',
    component: LandingpageComponent,
    

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
