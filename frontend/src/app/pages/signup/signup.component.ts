import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
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

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  })

    public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err)
        });
    }
    console.log(this.signupForm.valid);
    
  }
  
}
