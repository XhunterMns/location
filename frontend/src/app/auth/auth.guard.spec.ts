import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CanActivateFn, provideRouter, Router } from '@angular/router';

import { authGuard, landlordGuard, renterGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  const executeAdminGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminGuard(...guardParameters));
  const executeLandlordGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => landlordGuard(...guardParameters));
  const executeRenterGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => renterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow any logged-in user to access protected pages', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getRole').and.returnValue('renter');
    spyOn(router, 'navigate');

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect a renter away from admin page to renter dashboard', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getRole').and.returnValue('renter');
    spyOn(router, 'navigate');

    const result = executeAdminGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/renter']);
  });

  it('should redirect a landlord away from renter page to landlord dashboard', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getRole').and.returnValue('landlord');
    spyOn(router, 'navigate');

    const result = executeRenterGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/landlord']);
  });

  it('should redirect an admin away from landlord page to admin dashboard', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getRole').and.returnValue('admin');
    spyOn(router, 'navigate');

    const result = executeLandlordGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
