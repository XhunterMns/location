import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  showPassword = false;
  submitted = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (this.authService.isLoggedIn() && (role === 'admin' || role === 'landlord' || role === 'renter' || role === 'agency_owner' || role === 'agency_agent')) {
      this.router.navigate([
        role === 'admin' ? '/admin' :
        role === 'landlord' ? '/landlord' :
        role === 'agency_owner' || role === 'agency_agent' ? '/agency/dashboard' :
        '/renter'
      ]);
    }
  }

public onSubmit() {
  console.log('[SIGNUP] onSubmit triggered');
  console.log('[SIGNUP] Form value:', this.signupForm.value);
  console.log('[SIGNUP] Form valid:', this.signupForm.valid);
  console.log('[SIGNUP] Form errors:', {
    name: this.signupForm.controls.name.errors,
    email: this.signupForm.controls.email.errors,
    password: this.signupForm.controls.password.errors,
    role: this.signupForm.controls.role.errors
  });

  this.submitted = true;
  this.errorMessage = '';
  this.successMessage = '';

  if (this.signupForm.invalid) {
    console.warn('[SIGNUP] Form is invalid');
    this.signupForm.markAllAsTouched();
    return;
  }

  console.log('[SIGNUP] Sending HTTP request...');
  this.submitting = true;

  this.authService.signup(this.signupForm.value).subscribe({
    next: (res) => {
      console.log('[SIGNUP] API success:', res);
      this.submitting = false;
      this.successMessage = 'Account created. Redirecting to sign in…';
      setTimeout(() => this.router.navigate(['/login']), 700);
    },
    error: (err) => {
      console.error('[SIGNUP] API error:', err);
      this.submitting = false;
      this.errorMessage = err?.error?.message || err?.message || 'Unable to create account.';
    }
  });
}
}
