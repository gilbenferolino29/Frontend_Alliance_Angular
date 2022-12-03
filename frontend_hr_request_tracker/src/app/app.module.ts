import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './screens/landing-page/landingpage/landingpage.component';
import { LoginComponent } from './screens/login/login/login.component';
import { RegisterComponent } from './screens/register/register/register.component';
import { UserHomeComponent } from './screens/user-screens/home-ticket-user/user-home/user-home.component';
import { AdminHomeComponent } from './screens/admin-screens/home-ticket-admin/admin-home/admin-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ViewticketComponent } from './screens/viewticket/viewticket.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './screens/create-ticket/create-ticket.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { DeleteTicketComponent } from './screens/user-screens/delete-ticket/delete-ticket.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { UpdateTicketComponent } from './screens/user-screens/update-ticket/update-ticket.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { CreateTicketComponentDialog } from './screens/user-screens/create-ticket/create-ticket.component';
import { ViewTicketComponent } from './screens/user-screens/view-ticket/view-ticket.component';
import { MatListModule } from '@angular/material/list';
import { HomeTrackerComponent } from './screens/tracker/home-tracker/home-tracker.component';
import { HomeUserComponent } from './screens/users/home-user/home-user.component';
import { HomeRoleComponent } from './screens/roles/home-role/home-role.component';
import { CreateRoleComponent } from './screens/roles/create-role/create-role.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    AdminHomeComponent,
    ViewticketComponent,
    CreateTicketComponent,
    DeleteTicketComponent,
    UpdateTicketComponent,
    CreateTicketComponentDialog,
    ViewTicketComponent,
    HomeTrackerComponent,
    HomeUserComponent,
    HomeRoleComponent,
    CreateRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
