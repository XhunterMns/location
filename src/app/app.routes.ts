import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { LandlordComponent } from './pages/landlord/landlord.component';
import { AddLocalComponent } from './pages/landlord/add-local.component';
import { RenterComponent } from './pages/renter/renter.component';

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
        path: 'admin', component: AdminComponent, canActivate: [authGuard]
    },
     {
        path: 'landlord', component: LandlordComponent
    },
         {
                path: 'landlord/add', component: AddLocalComponent
        },
      {
        path: 'renter', component: RenterComponent
    },
];
