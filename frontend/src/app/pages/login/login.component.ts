import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  showPassword = false;
  rememberMe = false;
  submitted = false;
  submitting = false;
  errorMessage = '';

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
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

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.loginForm.valid) {
      return;
    }

    this.submitting = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        const role = (res.role || localStorage.getItem('role') || '')
          .trim()
          .toLowerCase();

        if (role === 'renter') {
          this.router.navigate(['/renter']);
        } else if (role === 'landlord') {
          this.router.navigate(['/landlord']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'agency_owner' || role === 'agency_agent') {
          this.router.navigate(['/agency/dashboard']);
        } else {
          this.errorMessage = 'Signed in, but this account role is not supported.';
        }
        this.submitting = false;
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Unable to sign in. Check your credentials and try again.';
      }
    });
  }
}
