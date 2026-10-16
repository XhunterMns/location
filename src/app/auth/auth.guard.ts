import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

function redirectToRoleHome(router: Router, role: string | null): false {
  const targetRoute = {
    admin: '/admin',
    landlord: '/landlord',
    renter: '/renter',
  }[role || ''] || '/login';

  router.navigate([targetRoute]);
  return false;
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getRole();
  if (role === 'landlord' || role === 'renter' || role === 'admin') {
    return true;
  }

  return redirectToRoleHome(router, role);
};

export const landlordGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getRole();
  if (role === 'landlord') {
    return true;
  }

  return redirectToRoleHome(router, role);
};

export const renterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getRole();
  if (role === 'renter') {
    return true;
  }

  return redirectToRoleHome(router, role);
};

export { redirectToRoleHome };
