import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard, landlordGuard, renterGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';
import { LandlordComponent } from './pages/landlord/landlord.component';
import { AddLocalComponent } from './pages/landlord/add-local.component';
import { RenterComponent } from './pages/renter/renter.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AgencyRegisterComponent } from './pages/agency/agency-register.component';
import { AgencyDashboardComponent } from './pages/agency/agency-dashboard.component';
import { AgencyProfileComponent } from './pages/agency/agency-profile.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [authGuard]
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [adminGuard]
    },
    {
        path: 'landlord', component: LandlordComponent, canActivate: [landlordGuard]
    },
    {
        path: 'landlord/add', component: AddLocalComponent, canActivate: [landlordGuard]
    },
    {
        path: 'renter', component: RenterComponent, canActivate: [renterGuard]
    },
    {
        path: 'agency/register', component: AgencyRegisterComponent, canActivate: [authGuard]
    },
    {
        path: 'agency/dashboard', component: AgencyDashboardComponent, canActivate: [authGuard]
    },
    {
        path: 'agency/:slug', component: AgencyProfileComponent
    },
];
