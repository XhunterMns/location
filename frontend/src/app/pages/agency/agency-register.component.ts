import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../../users/agency.service';

@Component({
  selector: 'app-agency-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agency-register.component.html',
  styleUrl: './agency-register.component.css'
})
export class AgencyRegisterComponent {
  private agencyService = inject(AgencyService);
  private router = inject(Router);

  loading = false;
  message = '';
  errorMessage = '';

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    business_email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    logo_url: new FormControl('', []),
  });

  submit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    this.agencyService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res?.message || 'Agency registration submitted successfully.';
        this.registerForm.reset();
        setTimeout(() => this.router.navigate(['/agency/dashboard']), 800);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Unable to register agency.';
      }
    });
  }
}
