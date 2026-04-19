import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RenterService } from '../../users/renter.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-renter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './renter.component.html',
  styleUrl: './renter.component.css'
})
export class RenterComponent {
  locals: any[] = [];
  reservations: any[] = [];
  selectedLocal: any | null = null;
  loading = false;
  pageError = '';
  reservationsError = '';
  reservationMessage = '';
  evaluationMessage = '';
  authService = inject(AuthService);
  router = inject(Router);
  reservationForm = new FormGroup({
    start_date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    end_date: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  evaluationForm = new FormGroup({
    note: new FormControl(5, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
    commentaire: new FormControl('', { nonNullable: true })
  });

  constructor(
    private renterService: RenterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.pageError = '';
    this.reservationsError = '';

    this.renterService.getAvailableLocals().subscribe({
      next: (locals: any) => {
        this.locals = Array.isArray(locals) ? locals : [];
        this.loading = false;
      },
      error: (err) => {
        this.pageError = err?.error?.message || 'Unable to load available locals.';
        this.loading = false;
      }
    });

    this.renterService.getMyReservations().subscribe({
      next: (reservations: any) => {
        this.reservations = Array.isArray(reservations) ? reservations : [];
      },
      error: (err) => {
        this.reservations = [];
        this.reservationsError = err?.error?.message || 'Unable to load reservations.';
      }
    });
  }

  view(local: any) {
    this.selectedLocal = { ...local, images: [], imagesLoading: true };
    this.reservationMessage = '';
    this.evaluationMessage = '';
    this.reservationForm.reset({ start_date: '', end_date: '' });
    this.evaluationForm.reset({ note: 5, commentaire: '' });

    this.renterService.getLocalImages(local.id).subscribe({
      next: (images: any) => {
        if (!this.selectedLocal || this.selectedLocal.id !== local.id) return;
        this.selectedLocal.images = Array.isArray(images) ? images : [];
        this.selectedLocal.imagesLoading = false;
      },
      error: () => {
        if (!this.selectedLocal || this.selectedLocal.id !== local.id) return;
        this.selectedLocal.images = [];
        this.selectedLocal.imagesLoading = false;
      }
    });
  }

  closeView() {
    this.selectedLocal = null;
    this.reservationMessage = '';
    this.evaluationMessage = '';
  }
  zoomImage: string | null = null;

  // open image in modal
  openZoom(img: string) {
    this.zoomImage = img;
  }
  
  // close modal
  closeZoom() {
    this.zoomImage = null;
  }
  reserveSelectedLocal() {
    if (!this.selectedLocal || this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    const payload = {
      local_id: this.selectedLocal.id,
      start_date: this.reservationForm.getRawValue().start_date,
      end_date: this.reservationForm.getRawValue().end_date
    };

    this.renterService.reserveLocal(payload).subscribe({
      next: (res: any) => {
        this.reservationMessage = res?.message || 'Reservation created.';
        this.loadDashboard();
      },
      error: (err) => {
        this.reservationMessage = err?.error?.message || 'Unable to create reservation.';
      }
    });
  }
  
  evaluateSelectedLocal() {
    if (!this.selectedLocal || this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      return;
    }

    const payload = {
      local_id: this.selectedLocal.id,
      note: Number(this.evaluationForm.getRawValue().note),
      commentaire: this.evaluationForm.getRawValue().commentaire.trim()
    };


    
    

    this.renterService.evaluateLocal(payload).subscribe({
      next: (res: any) => {
        this.evaluationMessage = res?.message || 'Evaluation saved.';
        this.loadDashboard();
      },
      error: (err) => {
        this.evaluationMessage = err?.error?.message || 'Unable to save evaluation.';
      }
    });
  }
  currentImageIndex = 0;

// next image
nextImage() {
  if (!this.selectedLocal?.images?.length) return;
  this.currentImageIndex =
    (this.currentImageIndex + 1) % this.selectedLocal.images.length;
}

// previous image
prevImage() {
  if (!this.selectedLocal?.images?.length) return;
  this.currentImageIndex =
    (this.currentImageIndex - 1 + this.selectedLocal.images.length) %
    this.selectedLocal.images.length;
}

// reset when opening modal
openView(local: any) {
  this.selectedLocal = local;
  this.currentImageIndex = 0;
}

}
