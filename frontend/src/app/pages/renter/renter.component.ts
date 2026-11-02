import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RenterService } from '../../users/renter.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-renter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent],
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
  searchTerm = '';
  cityFilter = '';
  leaseTypeFilter: 'all' | 'colocation' | 'individual' = 'all';
  priceSort: 'asc' | 'desc' | '' = '';
  readonly tunisianCities = [
    'Tunis', 'Sfax', 'Sousse', 'Monastir', 'Kairouan', 'Bizerte', 'Nabeul', 'Gabès', 'Ben Arous',
    'Ariana', 'Gafsa', 'Tozeur', 'Kasserine', 'Médenine', 'Mahdia', 'Jendouba', 'Manouba',
    'Kébili', 'Siliana', 'Zaghouan', 'Beja', 'Tataouine'
  ];
  authService = inject(AuthService);
  router = inject(Router);
  reservationForm = new FormGroup({
    start_date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    end_date: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  evaluationForm = new FormGroup({
    rating: new FormControl(5, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
    comment: new FormControl('', { nonNullable: true })
  });

  constructor(
    private renterService: RenterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getCountry(local: any): string {
    const country = String(local?.country || local?.country_name || 'Tunisia').trim();
    return country || 'Tunisia';
  }

  getLocationLabel(local: any): string {
    const city = String(local?.city || '').trim();
    const delegation = String(local?.delegation || '').trim();
    const country = this.getCountry(local);
    return [city, delegation, country].filter(Boolean).join(', ');
  }

  get filteredLocals(): any[] {
    const term = this.searchTerm.trim().toLowerCase();

    const filtered = this.locals.filter((local) => {
      const cityMatch = !this.cityFilter || String(local?.city || local?.address || '').toLowerCase().includes(this.cityFilter.toLowerCase());
      const leaseTypeMatch = this.leaseTypeFilter === 'all'
        || (this.leaseTypeFilter === 'colocation' && Boolean(local?.is_colocation))
        || (this.leaseTypeFilter === 'individual' && !local?.is_colocation);
      const searchMatch = !term || [
        local?.title,
        local?.address,
        local?.landlord_name,
        local?.description,
        local?.price?.toString(),
        local?.city,
        local?.delegation,
        this.getCountry(local)
      ].some((value) => String(value ?? '').toLowerCase().includes(term));

      return cityMatch && leaseTypeMatch && searchMatch;
    });

    if (this.priceSort === 'asc') {
      return filtered.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (this.priceSort === 'desc') {
      return filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filtered;
  }

  get filteredReservations(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.reservations;

    return this.reservations.filter((reservation) => {
      const fields = [
        reservation?.title,
        reservation?.address,
        reservation?.status,
        reservation?.start_date,
        reservation?.end_date
      ];

      return fields.some((value) => String(value ?? '').toLowerCase().includes(term));
    });
  }

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
        this.pageError = this.describeLoadError(err, 'Unable to load available locals.');
        this.loading = false;
      }
    });

    this.renterService.getMyReservations().subscribe({
      next: (reservations: any) => {
        this.reservations = Array.isArray(reservations) ? reservations : [];
      },
      error: (err) => {
        this.reservations = [];
        this.reservationsError = this.describeLoadError(err, 'Unable to load reservations.');
      }
    });
  }

  private describeLoadError(err: any, fallback: string): string {
    if (err?.status === 429) {
      return 'Too many requests right now. Wait a moment, then retry.';
    }
    return err?.error?.message || fallback;
  }

  view(local: any) {
    this.selectedLocal = { ...local, images: [], imagesLoading: true };
    this.reservationMessage = '';
    this.evaluationMessage = '';
    this.reservationForm.reset({ start_date: '', end_date: '' });
    this.evaluationForm.reset({ rating: 5, comment: '' });

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

  normalizePhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  }

  openWhatsApp(phone: string) {
    const cleanPhone = this.normalizePhoneNumber(phone);
    if (!cleanPhone || typeof window === 'undefined') return;

    const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;
    window.open(`https://wa.me/${waNumber}`, '_blank', 'noopener,noreferrer');
  }

  callOwner(phone: string) {
    const cleanPhone = this.normalizePhoneNumber(phone);
    if (!cleanPhone || typeof window === 'undefined') return;
    window.location.href = `tel:${cleanPhone}`;
  }

  messageOwner(phone: string) {
    const cleanPhone = this.normalizePhoneNumber(phone);
    if (!cleanPhone || typeof window === 'undefined') return;
    window.location.href = `sms:${cleanPhone}`;
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
      rating: Number(this.evaluationForm.getRawValue().rating),
      comment: this.evaluationForm.getRawValue().comment.trim()
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
  //cancel reservation
  delete(id: number) {  
    this.renterService.deleteReservation(id).subscribe(() => {
      this.loadDashboard();
    });
  }


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
