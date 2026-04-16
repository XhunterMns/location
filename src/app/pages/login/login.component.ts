import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe((res: any) => {

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);

          const role = (res.role || localStorage.getItem('role') || '')
            .trim()
            .toLowerCase();

          if (role === 'renter') {
            this.router.navigate(['/renter']);
          }
          else if (role === 'landlord') {
            this.router.navigate(['/landlord']);
          } else {
            console.log("UNKNOWN ROLE:", role);
          }
          console.log("LOGIN RESPONSE:", res);
          console.log("ROLE:", res.role);
        });
    }

  }
}

