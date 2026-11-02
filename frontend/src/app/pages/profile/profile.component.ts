import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);

  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  currentRole = 'user';
  showCurrentPassword = false;
  showNewPassword = false;

  profileForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    old_password: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  ngOnInit() {
    this.currentRole = this.authService.getRole() || 'user';
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.getProfile().subscribe({
      next: (user: any) => {
        this.profileForm.patchValue({
          name: user?.name || '',
          email: user?.email || ''
        });
        this.currentRole = user?.role || this.currentRole;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load your profile right now.';
        this.loading = false;
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.errorMessage = 'Please complete the required fields correctly.';
      this.successMessage = '';
      return;
    }

    const value = this.profileForm.getRawValue();
    const payload: any = {
      name: value.name,
      email: value.email
    };

    if (value.password && value.password.trim()) {
      if (!value.old_password || !value.old_password.trim()) {
        this.errorMessage = 'Please enter your current password before changing your password.';
        this.successMessage = '';
        this.saving = false;
        return;
      }

      payload.old_password = value.old_password.trim();
      payload.password = value.password.trim();
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        this.saving = false;
        this.profileForm.patchValue({ old_password: '', password: '' });
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Unable to update your profile.';
        this.saving = false;
      }
    });
  }
}
