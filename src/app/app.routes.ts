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

export const routes: Routes = [
     {
        path: '', redirectTo: '/login', pathMatch: 'full'
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
];
