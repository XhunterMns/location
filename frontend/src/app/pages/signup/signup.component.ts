import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

const PASSWORD_REQUIREMENTS =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{8,}$/;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

  ],
   animations: [
     trigger('fade', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateX(150px)' }),
          animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
          animate('400ms ease-in', style({ opacity: 0 }))
        ])
      ])
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
authService  =  inject(AuthService);
router  =  inject(Router);
readonly maxBirthDate = new Date().toISOString().slice(0, 10);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REQUIREMENTS),
    ]),
    role: new FormControl('', [Validators.required]),
  })

  public onSubmit() {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => console.error('Signup failed', err)
        });
    }
  }
}
